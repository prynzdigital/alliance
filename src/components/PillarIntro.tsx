import type { Pillar } from "@/lib/programs";
import { Button } from "@/components/ui/Button";

export function PillarIntro({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <>
      <div className="mt-4 flex items-center gap-4">
        <span
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `color-mix(in srgb, ${pillar.colorVar} 14%, transparent)` }}
        >
          <Icon className="h-7 w-7" style={{ color: pillar.colorVar }} />
        </span>
        <h1 style={{ color: pillar.colorVar }}>{pillar.name}</h1>
      </div>
      <p className="mt-3 max-w-2xl text-text-muted">{pillar.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {pillar.subPrograms.map((sub) => (
          <li key={sub} className="rounded-full bg-surface px-3 py-1 text-sm text-text-muted">
            {sub}
          </li>
        ))}
      </ul>
    </>
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
