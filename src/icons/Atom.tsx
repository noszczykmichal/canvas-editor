import { forwardRef } from "react";

interface AtomProps {
  className: string;
}

const Atom = forwardRef<SVGSVGElement, AtomProps>((props, ref) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      ref={ref}
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
});

export default Atom;
