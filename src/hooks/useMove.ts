import { useEffect, useRef, useState, RefObject } from "react";

const useMove = (moveHandle: RefObject<SVGSVGElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!moveHandle.current) {
      return undefined;
    }

    const moveHandleEl = moveHandle.current;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchLocation = event.targetTouches[0];
      setPosition({
        x: touchLocation.pageX - offset.current.x,
        y: touchLocation.pageY - offset.current.y,
      });
    };

    const handleMouseUp = (event: PointerEvent) => {
      moveHandleEl.releasePointerCapture(event.pointerId);
      moveHandleEl.removeEventListener("pointermove", handleMouseMove);
      moveHandleEl.removeEventListener("pointerup", handleMouseUp);
    };
    const handleTouchEnd = () => {
      moveHandleEl.removeEventListener("touchmove", handleTouchEnd);
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touchStart = event.targetTouches[0];
      offset.current = {
        x: touchStart.pageX - position.x,
        y: touchStart.pageY - position.y,
      };

      moveHandleEl.addEventListener("touchmove", handleTouchMove);
      moveHandleEl.addEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (event: PointerEvent) => {
      moveHandleEl.setPointerCapture(event.pointerId);
      offset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
      moveHandleEl.addEventListener("pointermove", handleMouseMove);
      moveHandleEl.addEventListener("pointerup", handleMouseUp);
    };

    moveHandleEl.addEventListener("pointerdown", handleMouseDown);
    moveHandleEl.addEventListener("touchstart", handleTouchStart);

    return () => {
      moveHandleEl.removeEventListener("pointerdown", handleMouseDown);
      moveHandleEl.removeEventListener("touchstart", handleTouchStart);
    };
  }, [moveHandle, position]);

  return position;
};

export default useMove;
