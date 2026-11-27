import { RefObject } from "react";

import useDrag from "@/hooks/useDrag";

type Position = { x: number; y: number };

const move = (start: Position, dx: number, dy: number): Position => ({
  x: start.x + dx,
  y: start.y + dy,
});

export default function useMove(
  moveHandle: RefObject<HTMLButtonElement | null>,
) {
  return useDrag(moveHandle, { x: 0, y: 0 }, move);
}
