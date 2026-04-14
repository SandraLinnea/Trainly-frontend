import type { SVGProps } from "react";

type CloseIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function CloseIcon({
  size = 18,
  ...props
}: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
