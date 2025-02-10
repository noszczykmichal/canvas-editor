import { useEffect, useState, RefObject } from "react";

const useResize = (
  resizeHandle: RefObject<SVGSVGElement | null>,

  resizedElementType: "image" | "textarea",
) => {
  const initialState =
    resizedElementType === "image"
      ? { width: 100, height: 100 }
      : { width: 320, height: 120 };

  const [size, setSize] = useState(initialState);

  useEffect(() => {
    if (!resizeHandle.current) {
      return undefined;
    }

    const resizeHandleEl = resizeHandle.current;

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touchStart = event.targetTouches[0];
      const startX = touchStart.pageX;
      const startY = touchStart.pageY;
      // offset.current = {
      //   x: touchStart.pageX - position.x,
      //   y: touchStart.pageY - position.y,
      // };

      // moveHandleEl.addEventListener("touchmove", handleTouchMove);
      // moveHandleEl.addEventListener("touchend", handleTouchEnd);
      const startWidth = size.width;
      const startHeight = size.height;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const touchLocation = moveEvent.targetTouches[0];
        const newWidth = startWidth + (touchLocation.pageX - startX);
        const newHeight = startHeight + (touchLocation.pageY - startY);
        setSize({
          width: Math.max(100, newWidth), // Minimum width 100px
          height: Math.max(50, newHeight), // Minimum height 50px
        });
      };

      const handleTouchEnd = () => {
        resizeHandleEl.removeEventListener("touchmove", handleTouchEnd);
      };

      resizeHandleEl.addEventListener("touchmove", handleTouchMove);
      resizeHandleEl.addEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (event: PointerEvent) => {
      event.preventDefault();
      resizeHandleEl.setPointerCapture(event.pointerId);

      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = size.width;
      const startHeight = size.height;

      // Mouse move handler
      const handleMouseMove = (moveEvent: PointerEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);

        setSize({
          width: Math.max(100, newWidth), // Minimum width 100px
          height: Math.max(50, newHeight), // Minimum height 50px
        });
      };

      // Stop Resizing
      const handleMouseUp = () => {
        resizeHandleEl.releasePointerCapture(event.pointerId);
        resizeHandleEl.removeEventListener("pointermove", handleMouseMove);
        resizeHandleEl.removeEventListener("pointerup", handleMouseUp);
      };

      resizeHandleEl.addEventListener("pointermove", handleMouseMove);
      resizeHandleEl.addEventListener("pointerup", handleMouseUp);
    };

    resizeHandleEl.addEventListener("pointerdown", handleMouseDown);
    resizeHandleEl.addEventListener("touchstart", handleTouchStart);

    return () => {
      resizeHandleEl.removeEventListener("pointerdown", handleMouseDown);
      resizeHandleEl.removeEventListener("touchstart", handleTouchStart);
    };
  }, [resizeHandle, size]);

  return size;
};

export default useResize;
