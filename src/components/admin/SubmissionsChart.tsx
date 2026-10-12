import { SUBMISSION_TYPES } from "@/lib/admin/types";

export const SUBMISSION_COLORS: Record<string, string> = {
  contact: "#5657c1",
  volunteer: "#0d6e78",
  mentoring: "#d1a542",
  newsletter: "#8e8fe0",
};

type Day = { day: string; counts: Record<string, number> };

// Stacked bar chart of the last N days of form submissions, drawn as plain SVG
// on the server (no chart library). Each bar has a <title> tooltip, and the
// whole chart has a text summary for screen readers.
export function SubmissionsChart({ days }: { days: Day[] }) {
  const totals = days.map((d) => Object.values(d.counts).reduce((a, b) => a + b, 0));
  const max = Math.max(4, ...totals);
  const ceiling = Math.ceil(max / 4) * 4;
  const W = 720;
  const H = 200;
  const padL = 28;
  const padB = 22;
  const chartW = W - padL;
  const chartH = H - padB;
  const slot = chartW / days.length;
  const barW = Math.max(4, slot * 0.62);
  const grand = totals.reduce((a, b) => a + b, 0);
  const byType = SUBMISSION_TYPES.map((t) => ({
    ...t,
    total: days.reduce((sum, d) => sum + (d.counts[t.value] ?? 0), 0),
  }));
  const label = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${grand} submissions in the last ${days.length} days: ${byType
          .map((t) => `${t.total} ${t.label.toLowerCase()}`)
          .join(", ")}.`}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = chartH - f * chartH;
          return (
            <g key={f}>
              <line x1={padL} x2={W} y1={y} y2={y} stroke="#081c2e" strokeOpacity={f === 0 ? 0.15 : 0.06} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="10" fill="#5a6470">
                {Math.round(f * ceiling)}
              </text>
            </g>
          );
        })}
        {days.map((d, i) => {
          const x = padL + i * slot + (slot - barW) / 2;
          let y = chartH;
          const total = totals[i];
          return (
            <g key={d.day}>
              <title>{`${label(d.day)}: ${total} submission${total === 1 ? "" : "s"}`}</title>
              <rect x={padL + i * slot} y={0} width={slot} height={chartH} fill="transparent" />
              {total === 0 ? (
                <rect x={x} y={chartH - 2} width={barW} height={2} rx={1} fill="#081c2e" fillOpacity={0.08} />
              ) : (
                SUBMISSION_TYPES.map((t) => {
                  const n = d.counts[t.value] ?? 0;
                  if (!n) return null;
                  const h = (n / ceiling) * chartH;
                  y -= h;
                  return <rect key={t.value} x={x} y={y} width={barW} height={h} rx={2} fill={SUBMISSION_COLORS[t.value]} />;
                })
              )}
              {(days.length - 1 - i) % 7 === 0 && (
                <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#5a6470">
                  {label(d.day)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {byType.map((t) => (
          <span key={t.value} className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: SUBMISSION_COLORS[t.value] }} aria-hidden />
            {t.label} <span className="text-text">{t.total}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
