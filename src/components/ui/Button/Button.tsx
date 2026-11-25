import { ReactNode, RefObject } from "react";

interface ButtonProps {
  children: ReactNode;
  className: string;
  ariaLabel: string;
  onClick?: () => void;
  ref?: RefObject<HTMLButtonElement | null>;
}

export default function Button({
  children,
  className,
  ariaLabel,
  onClick,
  ref,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
}
