// Row of headline figures. Every value passed in must be a verified fact —
// see docs/discovery/20_Client_Input_Required.md before adding new ones.
export function StatTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse gap-2 rounded-card bg-background p-6 shadow-md">
          <dt className="text-sm text-text-muted">{item.label}</dt>
          <dd
            className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
