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

export function MissionIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function VisionIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M2.25 12S6 5.5 12 5.5 21.75 12 21.75 12 18 18.5 12 18.5 2.25 12 2.25 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ValuesIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 20.2C6 16.6 3 13.4 3 9.9 3 7.2 5.1 5 7.7 5c1.6 0 3 .78 3.9 2 .9-1.22 2.3-2 3.9-2C18.1 5 20.2 7.2 20.2 9.9c0 3.5-3 6.7-8.2 10.3Z" />
    </svg>
  );
}
