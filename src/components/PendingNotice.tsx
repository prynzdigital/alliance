import { ReactNode } from "react";

export function PendingNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-black/20 bg-surface p-6 text-sm">
      <p className="font-semibold text-text-muted">Pending client confirmation</p>
      <div className="mt-2 text-text-muted">{children}</div>
    </div>
  );
}
