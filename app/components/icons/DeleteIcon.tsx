type DeleteIconProps = {
  size?: number;
  className?: string;
};

export default function DeleteIcon({ size = 24, className }: DeleteIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(1 0)" fill="currentColor">
        <path d="M0.982 5.073L2.007 15.339C2.007 15.705 2.314 16 2.691 16H10.271C10.648 16 10.955 15.705 10.955 15.339L11.98 5.073H0.982ZM7.033 14.068H5.961V6.989H7.033V14.068ZM9.033 14.068H7.961L8.961 6.989H10.033L9.033 14.068ZM5.033 14.068H3.961L2.961 6.989H4.033L5.033 14.068Z" />
        <path d="M12.075 2.105H8.937V0.709C8.937 0.317 8.481 0 8.081 0H4.986C4.586 0 4.031 0.225 4.031 0.615V2.011L0.886 2.105C0.485 2.105 0.159 2.421 0.159 2.813V3.968H12.8V2.813C12.801 2.422 12.477 2.105 12.075 2.105ZM4.947 1.44C4.947 1.128 5.298 0.875 5.73 0.875H7.294C7.726 0.875 8.076 1.129 8.076 1.44V2.105H4.946V1.44H4.947Z" />
      </g>
    </svg>
  );
}
