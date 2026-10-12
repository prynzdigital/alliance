"use server";

import { getSettings } from "@/lib/cms/content";
import { sql } from "@/lib/server/db";
import { escapeHtml, sendEmail, wrapEmail } from "@/lib/server/email";
import { isRateLimited } from "@/lib/server/rateLimit";

export type PublicFormType = "contact" | "volunteer" | "mentoring" | "newsletter";

export type PublicFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const FORM_LABELS: Record<PublicFormType, string> = {
  contact: "Contact form",
  volunteer: "Volunteer interest",
  mentoring: "Mentoring & Life Coaching",
  newsletter: "Newsletter signup",
};

const SUCCESS: Record<PublicFormType, string> = {
  contact: "Thank you — your message has been sent. Someone from SOC Alliance will get back to you soon.",
  volunteer: "Thank you for offering your time! We've received your interest and will be in touch.",
  mentoring: "Thank you for reaching out. Someone will follow up using the contact information you shared.",
  newsletter: "You're signed up. Thanks for staying connected!",
};

function field(formData: FormData, name: string, max: number): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One entry point for every public form. Submissions are saved to the admin
// inbox first (the record of truth); the notification email is a bonus that
// only goes out once Resend is configured.
export async function submitPublicForm(
  formType: PublicFormType,
  _prev: PublicFormState,
  formData: FormData
): Promise<PublicFormState> {
  if (!(formType in FORM_LABELS)) return { status: "error", message: "Unknown form." };

  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "website", 200)) return { status: "success", message: SUCCESS[formType] };

  if (await isRateLimited(`form:${formType}`, 6, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many submissions in a short time. Please try again in a few minutes." };
  }

  const name = field(formData, "name", 200);
  let email = field(formData, "email", 320);
  let phone = field(formData, "phone", 50);
  let topic = field(formData, "topic", 200);
  let message = field(formData, "message", 5000);
  const fieldErrors: Record<string, string> = {};

  if (formType === "contact") {
    if (!name) fieldErrors.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
    if (!message) fieldErrors.message = "Please enter a message.";
  } else if (formType === "volunteer") {
    if (!name) fieldErrors.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  } else if (formType === "mentoring") {
    // Single "best way to reach you" field — sort it into email or phone.
    const contact = field(formData, "contact", 320);
    if (!contact) fieldErrors.contact = "Please share a phone number or email so we can reach you.";
    if (EMAIL_RE.test(contact)) email = contact;
    else phone = contact;
  } else if (formType === "newsletter") {
    if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
    topic = "";
    message = "";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const settings = await getSettings();
  try {
    if (formType === "newsletter") {
      const existing = await sql`
        SELECT id FROM submissions WHERE form_type = 'newsletter' AND lower(email) = ${email.toLowerCase()} LIMIT 1
      `;
      if (existing.length > 0) return { status: "success", message: SUCCESS.newsletter };
    }
    await sql`
      INSERT INTO submissions (form_type, name, email, phone, topic, message)
      VALUES (${formType}, ${name || null}, ${email || null}, ${phone || null}, ${topic || null}, ${message || null})
    `;
  } catch (err) {
    console.error("Failed to save form submission:", err);
    return {
      status: "error",
      message: `Sorry, we couldn't send that right now. Please email ${settings.contact_email} or call ${settings.contact_phone}.`,
    };
  }

  if (formType !== "newsletter") {
    const rows = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Topic", topic],
      ["Message", message],
    ].filter(([, v]) => v);
    await sendEmail({
      to: settings.contact_email,
      subject: `[${FORM_LABELS[formType]}] ${name || "New submission"}`,
      replyTo: email || undefined,
      html: wrapEmail(`
        <p>A new <strong>${escapeHtml(FORM_LABELS[formType])}</strong> submission arrived on the website.</p>
        <table style="border-collapse:collapse;font-size:14px;">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#5a6470;vertical-align:top;">${k}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(v)}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:16px;">View and manage it in the admin dashboard under Inbox.</p>
      `),
    });
  }

  return { status: "success", message: SUCCESS[formType] };
}
