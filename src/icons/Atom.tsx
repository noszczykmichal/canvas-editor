import { FC, MouseEvent } from "react";

interface AtomProps {
  className: string;
  onMouseDown: (e: MouseEvent) => void;
}

const Atom: FC<AtomProps> = ({ className, onMouseDown }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={onMouseDown}
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
};

export default Atom;
