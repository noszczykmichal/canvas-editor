import { RefObject } from "react";

import useDrag from "@/hooks/useDrag";

type Position = { x: number; y: number };

const move = (start: Position, dx: number, dy: number): Position => ({
  x: start.x + dx,
  y: start.y + dy,
});

const useMove = (moveHandle: RefObject<SVGSVGElement | null>) =>
  useDrag(moveHandle, { x: 0, y: 0 }, move);

export default useMove;
