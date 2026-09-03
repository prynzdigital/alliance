import Link from "next/link";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";

// Slim announcement strip above the header. Shows the nearest real upcoming
// event (status is date-derived, so this never goes stale on its own) and
// falls back to an evergreen, verified line when nothing is upcoming —
// never a placeholder date.
export function TopBar() {
  const [nextEvent] = getUpcomingEvents();

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-2 bg-text px-3 text-center text-[11px] font-medium text-white sm:gap-3 sm:px-6 sm:text-xs">
      <svg viewBox="0 0 24 24" className="hidden h-4 w-4 shrink-0 sm:block" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 9.5h17M8 3v3M16 3v3" strokeLinecap="round" />
      </svg>
      {nextEvent ? (
        <span className="truncate">
          Join us: {nextEvent.title} ({formatEventDate(nextEvent.date)})
          {nextEvent.location ? ` · ${nextEvent.location}` : ""}
        </span>
      ) : (
        <span className="truncate">
          <span className="sm:hidden">501(c)(3) public charity</span>
          <span className="hidden sm:inline">
            SOC Alliance is a 501(c)(3) public charity &middot; EIN 36-4047035
          </span>
        </span>
      )}
      <Link
        href="/donate"
        className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-text transition-colors hover:bg-secondary-dark sm:text-xs"
      >
        Donate Now
      </Link>
    </div>
  );
}
