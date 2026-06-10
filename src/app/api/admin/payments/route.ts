import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { withPmtAdmin } from "@/lib/pmt-admin";

async function getServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

// GET — list pending payment submissions (admin only)
export const GET = withPmtAdmin(async (req, ctx, userId) => {
  const sb = await getServiceClient();
  const { data, error } = await sb
    .from("pmt_payments")
    .select(`
      id, trx_id, sender_number, amount, status, created_at,
      registration:pmt_registrations(id, team_name, captain_phone, tournament_id)
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data });
});

// POST — approve or reject a payment
export const POST = withPmtAdmin(async (req, ctx, userId) => {
  const body = await req.json();
  const { payment_id, action } = body as { payment_id: string; action: "approve" | "reject" };

  if (!payment_id || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "payment_id and action (approve|reject) required" }, { status: 400 });
  }

  const sb = await getServiceClient();

  // Update payment status
  const newStatus = action === "approve" ? "approved" : "rejected";
  const { error: payErr } = await sb
    .from("pmt_payments")
    .update({ status: newStatus, reviewed_by: userId, reviewed_at: new Date().toISOString() })
    .eq("id", payment_id)
    .eq("status", "pending"); // only update if still pending

  if (payErr) return NextResponse.json({ error: payErr.message }, { status: 500 });

  // If approved: update registration to confirmed
  if (action === "approve") {
    const { data: payment } = await sb
      .from("pmt_payments")
      .select("registration_id")
      .eq("id", payment_id)
      .single();

    if (payment?.registration_id) {
      await sb
        .from("pmt_registrations")
        .update({ status: "confirmed" })
        .eq("id", payment.registration_id)
        .eq("status", "payment_submitted");
    }
  }

  // If rejected: update registration to rejected
  if (action === "reject") {
    const { data: payment } = await sb
      .from("pmt_payments")
      .select("registration_id")
      .eq("id", payment_id)
      .single();

    if (payment?.registration_id) {
      await sb
        .from("pmt_registrations")
        .update({ status: "rejected" })
        .eq("id", payment.registration_id)
        .eq("status", "payment_submitted");
    }
  }

  return NextResponse.json({ success: true, payment_id, action });
});
