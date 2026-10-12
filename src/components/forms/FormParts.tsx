import type { PublicFormState } from "@/app/actions/forms";

export const initialFormState: PublicFormState = { status: "idle", message: "" };

export const inputClass =
  "mt-1 w-full rounded-button border border-black/15 bg-background px-3 py-2 text-sm text-text aria-[invalid=true]:border-red-600";

// Hidden from people (and from screen readers via aria-hidden + tabIndex -1);
// bots that auto-fill every input give themselves away by filling it.
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export function FormStatus({ state, dark = false }: { state: PublicFormState; dark?: boolean }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`text-sm ${
        state.status === "success"
          ? dark
            ? "font-semibold text-secondary"
            : "font-semibold text-accent"
          : state.status === "error"
            ? dark
              ? "font-semibold text-red-300"
              : "font-semibold text-red-700"
            : "sr-only"
      }`}
    >
      {state.message}
    </p>
  );
}
