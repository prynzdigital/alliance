import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsletterFeature } from "@/components/NewsletterFeature";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardImage } from "@/components/ui/Card";
import { getEvents, getNewsletters } from "@/lib/cms/content";
import { formatEventDate, getEventStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Upcoming and past events, news, and the latest newsletter from SOC Alliance.",
};

export default async function NewsEventsPage() {
  const [events, newsletters] = await Promise.all([getEvents(), getNewsletters()]);
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="News & Events"
        description="Upcoming events, recent news, and our latest newsletter."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
        image="/chicago.png"
        imageAlt="The Chicago skyline"
      />
      <NewsletterFeature newsletters={newsletters} />
      <Container className="py-16 md:py-24">
      <SectionHeading eyebrow="On the Calendar" title="Events & News" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((event) => {
          const status = getEventStatus(event.date);
          return (
            <Card key={event.id ?? event.title} href={event.href} className="h-full" neonAccent={event.color}>
              <CardImage src={event.image} alt={event.imageAlt} />
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={status} />
                <p className="text-sm font-semibold text-text-muted">{formatEventDate(event.date)}</p>
              </div>
              <h3 className="mt-2 text-lg">{event.title}</h3>
              {event.location && <p className="mt-1 text-sm text-text-muted">{event.location}</p>}
              <p className="mt-2 text-sm text-text-muted">{event.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                {event.cta} &rarr;
              </span>
            </Card>
          );
        })}
      </div>
      </Container>
    </>
  );
}
