import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/admin/AuthCard";
import { ResetForm } from "@/components/admin/AuthForms";

export const metadata: Metadata = { title: "Choose a New Password" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthCard title="Choose a new password" subtitle="Use at least 10 characters.">
      {token ? (
        <ResetForm token={token} />
      ) : (
        <p className="text-sm text-white/80">
          This link is missing its reset code.{" "}
          <Link href="/admin/forgot" className="font-semibold text-secondary underline">
            Request a new link
          </Link>
          .
        </p>
      )}
    </AuthCard>
  );
}
