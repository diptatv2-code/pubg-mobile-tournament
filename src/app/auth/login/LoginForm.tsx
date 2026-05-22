"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="player@example.com"
            className="pl-9"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-[var(--color-danger)]">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative mt-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="pl-9"
            {...register("password")}
          />
        </div>
        <div className="text-right mt-1">
          <a href="/auth/forgot-password" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Forgot password?</a>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-[var(--color-danger)]">
            {errors.password.message}
          </p>
        )}
      </div>
      {errorMsg && (
        <p className="rounded-md border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-danger)]">
          {errorMsg}
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        <LogIn className="h-4 w-4" />
        {isSubmitting ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
