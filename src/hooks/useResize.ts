import { RefObject } from "react";

import useDrag from "@/hooks/useDrag";

type Size = { width: number; height: number };

const MIN_WIDTH = 100;
const MIN_HEIGHT = 50;

const INITIAL_SIZE: Record<"image" | "textarea", Size> = {
  image: { width: 100, height: 100 },
  textarea: { width: 320, height: 120 },
};

const resize = (start: Size, dx: number, dy: number): Size => ({
  width: Math.max(MIN_WIDTH, start.width + dx),
  height: Math.max(MIN_HEIGHT, start.height + dy),
});

const useResize = (
  resizeHandle: RefObject<HTMLButtonElement | null>,
  resizedElementType: "image" | "textarea",
) => useDrag(resizeHandle, INITIAL_SIZE[resizedElementType], resize);

export default useResize;
