import type { Metadata } from "next";
import { AuthCard } from "@/components/admin/AuthCard";
import { ForgotForm } from "@/components/admin/AuthForms";
import { isEmailConfigured } from "@/lib/server/email";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset your password" subtitle="Enter the email on your admin account and we'll send a reset link.">
      <ForgotForm emailReady={isEmailConfigured()} />
    </AuthCard>
  );
}
