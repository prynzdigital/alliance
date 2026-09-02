import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingNotice } from "@/components/PendingNotice";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl">
          <PendingNotice>
            <p>
              Privacy policy content and requirements are still being finalized with SOC
              Alliance (docs/discovery/20_Client_Input_Required.md, item 9). This page will
              cover what information the site collects through its forms, how it&rsquo;s used,
              and who to contact with questions.
            </p>
          </PendingNotice>
        </div>
      </Container>
    </>
  );
}
