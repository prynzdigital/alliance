"use client";

import { useActionState, useState } from "react";
import { uploadMediaAction } from "@/app/admin/actions/manage";
import { idleState } from "@/lib/admin/types";
import { btn } from "./ui";

export function MediaUploader() {
  const [state, action, pending] = useActionState(uploadMediaAction, idleState);
  const [count, setCount] = useState(0);
  // The form (and its file picker) resets after each upload; keep the count in step.
  const [lastState, setLastState] = useState(state);
  if (lastState !== state) {
    setLastState(state);
    setCount(0);
  }
  return (
    <form action={action} className="rounded-2xl border-2 border-dashed border-primary/25 bg-white p-6 text-center shadow-sm">
      <label htmlFor="media-files" className="block cursor-pointer">
        <span className="block text-sm font-bold text-text">Upload images</span>
        <span className="mt-1 block text-xs text-text-muted">JPG, PNG, WebP, or GIF · up to 4 MB each · select several at once</span>
        <input
          id="media-files"
          type="file"
          name="files"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setCount(e.target.files?.length ?? 0)}
          className="mx-auto mt-4 block text-sm text-text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-primary-dark"
        />
      </label>
      <button type="submit" className={`${btn.gold} mt-4`} disabled={pending || count === 0}>
        {pending ? "Uploading…" : count > 1 ? `Upload ${count} images` : "Upload"}
      </button>
      {state.status !== "idle" && (
        <p role="status" className={`mt-3 text-sm font-semibold ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
