import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function ShoppingIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M3 5h2l2.5 10h9.5l2-7H7.2" />
      <circle cx="10" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
    </svg>
  );
}


export function DogClubIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M3.5 11.5l8.5-6 8.5 6" />
      <path d="M5.5 10.8V20h13V10.8" />
      <path d="M10 20v-5h4v5" />
      <path d="M9 12.5h6" />
    </svg>
  );
}

export function TrophyIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4z" />
      <path d="M6 6H4a2 2 0 0 0 2 4" />
      <path d="M18 6h2a2 2 0 0 1-2 4" />
      <path d="M12 11v3" />
      <path d="M9 20h6" />
      <path d="M10 14h4l1 6H9l1-6z" />
    </svg>
  );
}

export function VetIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M12 21s7-4.5 7-11a4 4 0 0 0-7-2 4 4 0 0 0-7 2c0 6.5 7 11 7 11z" />
      <path d="M12 10v4" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function CoursesIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M4 19V7a2 2 0 0 1 2-2h12v14" />
      <path d="M6 17h12" />
      <path d="M8 9h6" />
      <path d="M8 12h8" />
    </svg>
  );
}
