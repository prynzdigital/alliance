export function StatusBadge({ status }: { status: "upcoming" | "past" }) {
  const isUpcoming = status === "upcoming";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        isUpcoming ? "bg-accent/10 text-accent" : "bg-black/5 text-text-muted"
      }`}
    >
      {isUpcoming ? "Upcoming" : "Past"}
    </span>
  );
}
