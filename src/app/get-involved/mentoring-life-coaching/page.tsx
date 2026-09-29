import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MentoringForm } from "@/components/MentoringForm";
import { Button } from "@/components/ui/Button";

// Must stay in the sitemap and be indexed — the current live site omits an
// equivalent page from its sitemap entirely (MASTER_BUILD_SPECIFICATION.md,
// Section 7). Tone written dignity-first and trauma-informed per
// docs/discovery/09_Content_Strategy.md, Content Rule 3 — still recommend a
// client read-through before this goes live given the sensitivity here.
export const metadata: Metadata = {
  title: "Mentoring & Life Coaching",
  description: "Support for people affected by firearm violence — reach out by form or phone, in confidence.",
};

export default function MentoringPage() {
  return (
    <>
      <PageHeader
        title="Mentoring & Life Coaching"
        description="If you or someone you care about has been affected by firearm violence, you don't have to figure out what's next alone. SOC Alliance offers one-on-one mentoring and life coaching, and we're here to listen first."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Mentoring & Life Coaching" },
        ]}
      />
      <Container className="py-16 md:py-24">
      <div className="grid max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_1.2fr]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-card shadow-md">
          <Image
            src="/mentoring-flyer.png"
            alt="Flyer for the SOC Alliance Mentoring & Life Coaching Program, in partnership with IDHS and the Strengthening Violence Prevention Initiative"
            fill
            sizes="(min-width: 640px) 35vw, 90vw"
            className="object-cover object-top"
          />
        </div>
        <div>
          <h2 className="text-lg">Who this program serves</h2>
          <p className="mt-2 text-text-muted">
            Free, trauma-informed mentoring and life coaching for survivors of violence ages 18
            to 35, offered through SOC Alliance&rsquo;s Strengthening Violence Prevention
            Initiative in partnership with the Illinois Department of Human Services (IDHS).
          </p>
          <p className="mt-3 text-sm font-semibold text-text">
            Serving Fuller Park, South Chicago, and South Deering
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-2xl rounded-card border border-black/10 bg-surface p-6">
        <h2 className="text-lg">What happens after you reach out</h2>
        <p className="mt-2 text-text">
          A member of our team will follow up directly, using whatever contact method you tell
          us works best. There&rsquo;s no obligation and no judgment — we&rsquo;ll talk through
          what kind of support makes sense for your situation.
        </p>
      </div>

      <div className="mt-6 max-w-2xl">
        <p className="text-text-muted">
          What you share with us is kept in confidence and used only to connect you with the
          right support.
        </p>
      </div>

      <div className="mt-10 grid max-w-3xl grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-lg">Reach Out Online</h2>
          <div className="mt-4">
            <MentoringForm />
          </div>
        </div>

        <div>
          <h2 className="text-lg">Reach Out by Phone</h2>
          <p className="mt-2 text-text-muted">Prefer to talk to someone directly right now?</p>
          <Button href="tel:+17736932222" variant="accent" className="mt-4">
            Call 773-693-2222
          </Button>
        </div>
      </div>
      </Container>
    </>
  );
}
