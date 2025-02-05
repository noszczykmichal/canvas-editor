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
      wrappingEl.removeEventListener("mousemove", handleMouseMove);
      wrappingEl.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      offset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
      wrappingEl.addEventListener("mousemove", handleMouseMove);
      wrappingEl.addEventListener("mouseup", handleMouseUp);
    };

    moveHandleEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      moveHandleEl.removeEventListener("mousedown", handleMouseDown);
    };
  }, [moveHandle, wrappingContainer, position]);

  return position;
};

export default useMove;
