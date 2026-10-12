import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/admin/AuthCard";
import { LoginForm } from "@/components/admin/AuthForms";
import { getCurrentUser } from "@/lib/server/auth";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; reset?: string }> }) {
  if (await getCurrentUser()) redirect("/admin");
  const { next, reset } = await searchParams;
  return (
    <AuthCard title="Admin Dashboard" subtitle="Sign in to manage the SOC Alliance website.">
      <LoginForm next={next} notice={reset ? "Your password was updated. Sign in with your new password." : undefined} />
    </AuthCard>
  );
}
