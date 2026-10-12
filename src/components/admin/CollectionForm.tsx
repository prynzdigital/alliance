"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { getCollection, type CollectionField } from "@/lib/cms/collections";
import { idleState, type ActionState } from "@/lib/admin/types";
import { btn, field as fieldCls } from "./ui";

export type MediaOption = { url: string; filename: string | null };

function ImageInput({
  field,
  value,
  error,
  media,
}: {
  field: CollectionField;
  value: string;
  error?: string;
  media: MediaOption[];
}) {
  const [url, setUrl] = useState(value);
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const shown = remove ? null : preview || url || null;
  const id = `f-${field.name}`;

  return (
    <div>
      <span className={fieldCls.label} id={`${id}-label`}>
        {field.label}
      </span>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-black/10 bg-[#f4f5fb] sm:w-48">
          {shown ? (
            <Image src={shown} alt="Current image preview" fill sizes="192px" className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center px-4 text-center text-xs text-text-muted">No image</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <label className="block">
            <span className="text-xs font-semibold text-text">Upload a new image</span>
            <input
              key={fileKey}
              type="file"
              name={`${field.name}__file`}
              accept="image/jpeg,image/png,image/webp,image/gif"
              aria-describedby={`${id}-help`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setRemove(false);
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
              className="mt-1 block w-full text-sm text-text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-primary-dark"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-text">…or image path / link</span>
            <input
              type="text"
              name={field.name}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setRemove(false);
              }}
              placeholder="/omega-gras.jpg or https://…"
              className={fieldCls.input}
              aria-invalid={Boolean(error)}
            />
          </label>
          {media.length > 0 && (
            <details className="rounded-xl border border-black/10 bg-white px-3 py-2">
              <summary className="cursor-pointer text-xs font-semibold text-primary">Choose from Media Library</summary>
              <div className="mt-3 grid max-h-56 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6">
                {media.map((m) => (
                  <button
                    key={m.url}
                    type="button"
                    onClick={() => {
                      setUrl(m.url);
                      setPreview(null);
                      setRemove(false);
                      setFileKey((k) => k + 1);
                    }}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                      url === m.url ? "border-primary" : "border-transparent hover:border-primary/40"
                    }`}
                    aria-label={`Use ${m.filename ?? "image"}`}
                  >
                    <Image src={m.url} alt="" fill sizes="80px" className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </details>
          )}
          {(url || preview) && (
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-red-700">
              <input
                type="checkbox"
                name={`${field.name}__remove`}
                checked={remove}
                onChange={(e) => setRemove(e.target.checked)}
                className="h-4 w-4 rounded border-black/20"
              />
              Remove image
            </label>
          )}
          <p id={`${id}-help`} className={fieldCls.help}>
            JPG, PNG, WebP, or GIF up to 4 MB. {field.help}
          </p>
          {error && <p className={fieldCls.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  error,
  media,
}: {
  field: CollectionField;
  value: unknown;
  error?: string;
  media: MediaOption[];
}) {
  const id = `f-${field.name}`;
  const describedBy = [field.help ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: field.name,
    required: field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className: fieldCls.input,
  };
  const str = value == null ? "" : String(value);

  if (field.type === "image") return <ImageInput field={field} value={str} error={error} media={media} />;

  if (field.type === "checkbox") {
    return (
      <label htmlFor={id} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
        <input
          id={id}
          type="checkbox"
          name={field.name}
          defaultChecked={value !== false}
          className="h-5 w-5 rounded border-black/20 accent-primary"
        />
        <span className="text-sm font-semibold text-text">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label htmlFor={id} className={fieldCls.label}>
        {field.label}
        {field.required && <span className="text-red-700"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} defaultValue={str} rows={field.name === "body" ? 8 : 4} placeholder={field.placeholder} />
      ) : field.type === "select" ? (
        <select {...common} defaultValue={str || String(field.default ?? "")}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
          defaultValue={str}
          placeholder={field.placeholder}
        />
      )}
      {field.help && (
        <p id={`${id}-help`} className={fieldCls.help}>
          {field.help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={fieldCls.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export function CollectionForm({
  slug,
  initial,
  action,
  media,
}: {
  slug: string;
  initial: Record<string, unknown> | null;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  media: MediaOption[];
}) {
  const def = getCollection(slug)!;
  const [state, formAction, pending] = useActionState(action, idleState);
  const errors = state.fieldErrors ?? {};

  // React resets a form after its action runs; when the server bounces it back
  // with errors, remount the fields filled with what was just submitted.
  const [version, setVersion] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (lastState !== state) {
    setLastState(state);
    setVersion((v) => v + 1);
  }
  const echoed = state.values;
  const valueOf = (f: CollectionField): unknown => {
    if (echoed) return f.type === "checkbox" ? echoed[f.name] === "on" : (echoed[f.name] ?? "");
    return initial ? initial[f.name] : f.default;
  };

  const mainFields = def.fields.filter((f) => f.type !== "checkbox" && f.name !== "sort_order");
  const sideFields = def.fields.filter((f) => f.type === "checkbox" || f.name === "sort_order");

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]" noValidate>
      <div className="flex flex-col gap-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        {state.status === "error" && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {state.message}
          </p>
        )}
        {mainFields.map((f) => (
          <FieldInput key={`${f.name}-${version}`} field={f} value={valueOf(f)} error={errors[f.name]} media={media} />
        ))}
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
        <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          {sideFields.map((f) => (
            <FieldInput key={`${f.name}-${version}`} field={f} value={valueOf(f)} error={errors[f.name]} media={media} />
          ))}
          <button type="submit" className={btn.primary} disabled={pending}>
            {pending ? "Saving…" : initial ? "Save changes" : `Add ${def.singular.toLowerCase()}`}
          </button>
          <Link href={`/admin/${def.slug}`} className="text-center text-sm font-semibold text-text-muted hover:text-primary">
            Cancel
          </Link>
        </div>
        <p className="px-1 text-xs text-text-muted">Saving updates the live website right away. Appears on: {def.appearsOn}.</p>
      </aside>
    </form>
  );
}
