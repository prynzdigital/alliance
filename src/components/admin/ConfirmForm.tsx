"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

function SubmitButton({ className, children, pendingLabel }: { className: string; children: ReactNode; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}

// A one-button form that runs a Server Action, asking for confirmation first
// when `confirm` is set (used for deletes and other destructive actions).
export function ConfirmForm({
  action,
  confirm: confirmMessage,
  className,
  children,
  pendingLabel,
}: {
  action: () => Promise<void>;
  confirm?: string;
  className: string;
  children: ReactNode;
  pendingLabel?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirmMessage && !window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <SubmitButton className={className} pendingLabel={pendingLabel}>
        {children}
      </SubmitButton>
    </form>
  );
}
