import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Leadership & Board",
  description: "Meet the volunteer Board of Directors of SOC Alliance.",
};

// Roster and photos sourced directly from the live site (socalliance.org/board-of-directors)
// on 2026-08-30 — see docs/assets/board-photos/README.md for provenance and
// docs/discovery/02_Organization_Research.md, Section 4, for the Form 990
// discrepancies noted below.
const board = [
  { name: "Theodore Davis", title: "Board Chair", image: "/board/theodore-davis-board-chair.webp" },
  { name: "Ronald Hughes", title: "Executive Director", image: "/board/ronald-hughes-executive-director.webp" },
  { name: "Bruce Nash", title: "Treasurer", image: "/board/bruce-nash-treasurer.webp" },
  { name: "Dana O'Banion", title: "Director", image: "/board/dana-obanion-director.webp" },
  { name: "Dathon O'Banion", title: "Director", image: "/board/dathon-obanion-director.webp" },
  { name: "Stephen Coleman", title: "Director", image: "/board/stephen-coleman-director.webp" },
  { name: "Gerald McCarthy", title: "Director", image: "/board/gerald-mccarthy-director.webp" },
  { name: "Dejuan Lever", title: "Director", image: "/board/dejuan-lever-director.webp" },
];

export default function LeadershipBoardPage() {
  return (
    <>
      <PageHeader
        title="Leadership & Board"
        description="SOC Alliance is led entirely by a volunteer Board of Directors — every officer reports $0 compensation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership & Board" },
        ]}
      />
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {board.map((person) => (
            <div key={person.name} className="overflow-hidden rounded-card border border-black/10 bg-background">
              <div className="relative aspect-square w-full bg-surface">
                <Image
                  src={person.image}
                  alt={`Portrait of ${person.name}, ${person.title} of SOC Alliance`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-text">{person.name}</p>
                <p className="text-sm text-text-muted">{person.title}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-text-muted">
          Note on accuracy: SOC Alliance&rsquo;s most recent IRS Form 990 lists Gerald McCarthy
          as Treasurer (rather than Director) and includes an additional director, John Moore,
          who does not appear on the roster above. This page reflects the current live site;
          we&rsquo;ve flagged the discrepancy with SOC Alliance and will update it once
          confirmed.
        </p>
      </Container>
    </>
  );
}
