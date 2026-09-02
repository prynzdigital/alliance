import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "outline" | "outlineInverse" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md hover:shadow-primary/20",
  accent: "bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md hover:shadow-accent/20",
  secondary: "bg-secondary-dark text-text hover:bg-secondary shadow-sm hover:shadow-md hover:shadow-secondary/20",
  outline: "border border-primary text-primary hover:bg-surface",
  outlineInverse: "border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/25",
  ghost: "text-primary hover:bg-surface",
  light: "bg-white text-primary-dark hover:bg-white/90 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", pill = false, children, className = "", ...rest } = props;
  const radius = pill ? "rounded-full" : "rounded-button";
  const classes = `${base} ${radius} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const isExternalScheme = /^(mailto:|tel:|https?:)/.test(href);

    if (isExternalScheme) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
