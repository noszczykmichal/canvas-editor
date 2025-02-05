import { useEffect, useRef, useState, RefObject } from "react";

const useMove = (
  moveHandle: RefObject<SVGSVGElement | null>,
  wrappingContainer: RefObject<HTMLDivElement | null> | null,
) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!moveHandle.current || !wrappingContainer?.current) {
      return undefined;
    }

    const moveHandleEl = moveHandle.current;
    const wrappingEl = wrappingContainer?.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      wrappingEl.removeEventListener("pointermove", handleMouseMove);
      wrappingEl.removeEventListener("pointerup", handleMouseUp);
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      offset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
      wrappingEl.addEventListener("pointermove", handleMouseMove);
      wrappingEl.addEventListener("pointerup", handleMouseUp);
    };

    moveHandleEl.addEventListener("pointerdown", handleMouseDown);

    return () => {
      moveHandleEl.removeEventListener("pointerdown", handleMouseDown);
    };
  }, [moveHandle, wrappingContainer, position]);

  return position;
};

export default useMove;
