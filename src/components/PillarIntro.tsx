import type { Pillar } from "@/lib/programs";
import { Button } from "@/components/ui/Button";

// Title, summary, and photo now live in the page's PageHeader (tinted with
// the pillar's own accent color) — this just surfaces the icon and the
// specific programs under this pillar, so there's no duplicate <h1>.
export function PillarIntro({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `color-mix(in srgb, ${pillar.colorVar} 14%, transparent)` }}
      >
        <Icon className="h-5 w-5" style={{ color: pillar.colorVar }} />
      </span>
      <ul className="flex flex-wrap gap-2">
        {pillar.subPrograms.map((sub) => (
          <li key={sub} className="rounded-full bg-surface px-3 py-1 text-sm text-text-muted">
            {sub}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PillarCTAs({ pillarName }: { pillarName: string }) {
  return (
    <div className="mt-12 flex flex-wrap gap-4 border-t border-black/10 pt-8">
      <Button href="/get-involved/volunteer" variant="primary">
        Volunteer With This Program
      </Button>
      <Button href="/donate" variant="outline">
        Donate to {pillarName} Programs
      </Button>
    </div>
  );
}
