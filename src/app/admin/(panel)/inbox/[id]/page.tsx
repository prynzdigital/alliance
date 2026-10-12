import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteSubmission, updateSubmission } from "@/app/admin/actions/manage";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { SubmissionForm } from "@/components/admin/SubmissionForm";
import { AdminPageHeader, Badge, Panel, btn, formatDateTime } from "@/components/admin/ui";
import { SUBMISSION_TYPES } from "@/lib/admin/types";
import { telHref } from "@/lib/cms/settings";
import { requireUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

export const metadata: Metadata = { title: "Message" };

type Row = {
  id: number;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  topic: string | null;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const id = Number.parseInt((await params).id, 10);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const [row] = await sql<Row>`SELECT * FROM submissions WHERE id = ${id}`;
  if (!row) notFound();

  // Opening a new message moves it out of "New" so the badge count stays honest.
  if (row.status === "New") {
    await sql`UPDATE submissions SET status = 'In Progress', updated_at = now() WHERE id = ${id} AND status = 'New'`;
    row.status = "In Progress";
  }

  const typeLabel = SUBMISSION_TYPES.find((t) => t.value === row.form_type)?.label ?? row.form_type;
  const details = [
    ["Name", row.name],
    ["Email", row.email],
    ["Phone", row.phone],
    [row.form_type === "volunteer" ? "Pillar of interest" : "Topic", row.topic],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <AdminPageHeader
        eyebrow={
          <Link href="/admin/inbox" className="hover:underline">
            ← Inbox
          </Link>
        }
        title={row.name || row.email || row.phone || "Anonymous message"}
        description={
          <>
            <Badge tone="blue">{typeLabel}</Badge> <span className="ml-1">Received {formatDateTime(row.created_at)}</span>
          </>
        }
        actions={
          <>
            {row.email && (
              <a href={`mailto:${row.email}`} className={btn.primary}>
                Reply by email
              </a>
            )}
            {row.phone && (
              <a href={telHref(row.phone)} className={btn.ghost}>
                Call
              </a>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-6">
          <Panel title="Details">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-bold uppercase tracking-widest text-text-muted">{k}</dt>
                  <dd className="mt-1 break-words text-sm text-text">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
          {row.message && (
            <Panel title="Message">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-text">{row.message}</p>
            </Panel>
          )}
        </div>
        <aside className="flex flex-col gap-4 self-start">
          <Panel title="Follow-up">
            <SubmissionForm status={row.status} notes={row.admin_notes ?? ""} action={updateSubmission.bind(null, id)} />
          </Panel>
          <ConfirmForm
            action={deleteSubmission.bind(null, id)}
            confirm="Delete this submission permanently?"
            className={`${btn.danger} w-full`}
            pendingLabel="Deleting…"
          >
            Delete submission
          </ConfirmForm>
        </aside>
      </div>
    </>
  );
}
