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

export function DogIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="8.2" cy="6.5" rx="1.9" ry="3.1" transform="rotate(-8 8.2 6.5)" />
      <ellipse cx="15.8" cy="6.5" rx="1.9" ry="3.1" transform="rotate(8 15.8 6.5)" />
      <ellipse cx="5" cy="11.2" rx="2" ry="2.8" transform="rotate(-24 5 11.2)" />
      <ellipse cx="19" cy="11.2" rx="2" ry="2.8" transform="rotate(24 19 11.2)" />
      <path d="M8.1 14.3c.6-2.5 2-4.1 3.9-4.1s3.3 1.6 3.9 4.1c.3 1.1 1.7 1.7 2 3.5.4 2.2-1.3 3.7-3.4 3.3-1.1-.2-1.6-.8-2.5-.8s-1.4.6-2.5.8c-2.1.4-3.8-1.1-3.4-3.3.3-1.8 1.7-2.4 2-3.5z" />
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.6 7.2 12 3.3l9.4 3.9L12 11.1 2.6 7.2z" />
      <path d="M6.2 10.2v4.1c0 .4.2.7.6.9l4.6 2.1c.4.2.8.2 1.2 0l4.6-2.1c.4-.2.6-.5.6-.9v-4.1L12 12.6 6.2 10.2z" />
      <path d="M18.5 9.4v5.5" />
      <path d="M17.5 18.8h2l-.6-3.6h-.8l-.6 3.6z" />
    </svg>
  );
}

export function TrainingInspirationIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.5 16.8c0-.7.5-1.2 1.2-1.2h3.4c.7 0 1.2.5 1.2 1.2v1.6c0 .7-.5 1.2-1.2 1.2H4.7c-.7 0-1.2-.5-1.2-1.2v-1.6z" />
      <path d="M5.5 7.1c0-.6.5-1 1-1h1.8c.6 0 1 .4 1 1v2.3c0 .6-.4 1-1 1H6.5c-.5 0-1-.4-1-1V7.1z" />
      <path d="M6.5 10h1.8v5.9H6.5V10z" />
      <path d="M10.3 15.1c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2v1.8c0 .7-.5 1.2-1.2 1.2h-3.5c-.7 0-1.2-.5-1.2-1.2v-1.8z" />
      <path d="M12.4 5.9c0-.6.5-1 1-1h1.9c.6 0 1 .4 1 1v2.5c0 .6-.4 1-1 1h-1.9c-.5 0-1-.4-1-1V5.9z" />
      <path d="M13.4 9h1.8v5.2h-1.8V9z" />
      <path d="M16.8 17.1c0-.7.5-1.2 1.2-1.2h3.1c.7 0 1.2.5 1.2 1.2v1.9c0 .7-.5 1.2-1.2 1.2H18c-.7 0-1.2-.5-1.2-1.2v-1.9z" />
      <path d="M18.6 3.9c0-.7.5-1.2 1.2-1.2h2.1c.7 0 1.2.5 1.2 1.2v3.3c0 .7-.5 1.2-1.2 1.2h-2.1c-.7 0-1.2-.5-1.2-1.2V3.9z" />
      <path d="M19.6 8h1.9v8.1h-1.9V8z" />
    </svg>
  );
}
