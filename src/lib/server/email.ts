import "server-only";

// Transactional email via Resend's REST API (no SDK needed). Sending is
// optional: with no RESEND_API_KEY the site still works and every submission
// is kept in the admin inbox — emails are a notification on top, not the
// record of truth.
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn("RESEND_API_KEY / EMAIL_FROM not configured; skipping email:", subject);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

export function wrapEmail(bodyHtml: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#081c2e;">
      <h2 style="color:#5657c1;margin-bottom:16px;">SOC Alliance</h2>
      ${bodyHtml}
      <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;">
      <p style="font-size:12px;color:#5a6470;">Strengthening Our Community Alliance &middot; 6615 S. Kenwood Ave., Chicago, IL 60637</p>
    </div>
  `;
}
