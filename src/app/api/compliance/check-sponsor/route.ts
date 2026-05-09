import { NextRequest, NextResponse } from 'next/server'
import { checkSponsorCategory } from '@/lib/compliance'
export async function POST(req: NextRequest) {
  const { category } = await req.json()
  return NextResponse.json(checkSponsorCategory(category))
}
