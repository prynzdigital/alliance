export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  /** What was submitted, echoed back on a validation error so the form can be refilled. */
  values?: Record<string, string>;
};

export const idleState: ActionState = { status: "idle", message: "" };

export const SUBMISSION_TYPES = [
  { value: "contact", label: "Contact" },
  { value: "volunteer", label: "Volunteer" },
  { value: "mentoring", label: "Mentoring" },
  { value: "newsletter", label: "Newsletter" },
] as const;

export const SUBMISSION_STATUSES = ["New", "In Progress", "Closed"] as const;
