function PhotoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10.5" r="1.75" />
      <path d="M21 16.5 15.5 12 5 19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-card border border-dashed border-black/20 bg-surface text-center ${className}`}
    >
      <PhotoIcon className="h-8 w-8 text-text-muted" aria-hidden="true" />
      <p className="max-w-xs px-4 text-sm text-text-muted">[PENDING PHOTO: {label}]</p>
    </div>
  );
}
