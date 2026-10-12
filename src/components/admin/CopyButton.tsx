"use client";

import { useState } from "react";

export function CopyButton({ text, className }: { text: string; className: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          window.prompt("Copy this link:", text);
        }
      }}
    >
      <span aria-live="polite">{copied ? "Copied!" : "Copy link"}</span>
    </button>
  );
}
