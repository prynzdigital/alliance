import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ScholarshipIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6.5 10.8v4.2c0 1.4 2.46 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.2" />
      <path d="M21 8.5v5.5" />
    </svg>
  );
}

export function EconomicDevelopmentIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M3 17.5 9.5 11l4 4L21 6.5" />
      <path d="M15.5 6.5H21v5.5" />
    </svg>
  );
}

export function CommunityIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8.5" cy="8" r="2.75" />
      <circle cx="16" cy="9" r="2.25" />
      <path d="M3 19.5c0-2.9 2.46-5.25 5.5-5.25S14 16.6 14 19.5" />
      <path d="M14.75 14.85c2.44.28 4.25 2.32 4.25 4.65" />
    </svg>
  );
}

export function HealthIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M3 12.5h4l1.8-4 3 7 2-4.5H21" />
      <path d="M12 20.2C6 16.6 3 13.4 3 9.9 3 7.2 5.1 5 7.7 5c1.6 0 3 .78 3.9 2 .9-1.22 2.3-2 3.9-2C18.1 5 20.2 7.2 20.2 9.9c0 3.5-3 6.7-8.2 10.3Z" />
    </svg>
  );
}
