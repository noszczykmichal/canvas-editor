import { FC } from "react";

interface AtomProps {
  className: string;
}

const Atom: FC<AtomProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
};

export default Atom;
