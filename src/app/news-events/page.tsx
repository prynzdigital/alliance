import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardImage } from "@/components/ui/Card";
import { events, formatEventDate, getEventStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Upcoming and past events from SOC Alliance.",
};

export default function NewsEventsPage() {
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="News & Events"
        description="Status below is derived automatically from each event's date, so this list never goes stale."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />
      <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((event) => {
          const status = getEventStatus(event.date);
          return (
            <Card key={event.title} href={event.href} className="h-full" neonAccent={event.color}>
              <CardImage src={event.image} alt={event.imageAlt} />
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={status} />
                <p className="text-sm font-semibold text-text-muted">{formatEventDate(event.date)}</p>
              </div>
              <h2 className="mt-2 text-lg">{event.title}</h2>
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
