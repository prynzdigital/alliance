import { SVGProps } from "react";

export function FacebookIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.24 4.26 15.35 4.18 14.3 4.18c-2.2 0-3.7 1.34-3.7 3.8V10.5H8v3h2.6V21h2.9z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} {...props}>
      <path d="M6.94 8.5H4.06V19h2.88V8.5ZM5.5 4.5a1.67 1.67 0 1 0 0 3.34A1.67 1.67 0 0 0 5.5 4.5ZM19.94 19h-2.88v-5.4c0-1.29-.46-2.16-1.6-2.16-.88 0-1.4.59-1.63 1.16-.08.2-.1.48-.1.76V19h-2.88s.04-9.65 0-10.5h2.88v1.49c.38-.59 1.07-1.42 2.6-1.42 1.9 0 3.32 1.24 3.32 3.9V19Z" />
    </svg>
  );
}
