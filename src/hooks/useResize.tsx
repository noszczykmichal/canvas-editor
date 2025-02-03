import { useEffect, useState, useRef, RefObject } from "react";

const useResize = (
  resizeHandle: RefObject<SVGSVGElement>,
  wrappingContainer: RefObject<HTMLDivElement> | null,
  resizedElementType: "image" | "textarea"
) => {
  const initialState =
    resizedElementType === "image"
      ? { width: 100, height: 100 }
      : { width: 320, height: 120 };

  const [size, setSize] = useState(initialState);
  const isResizing = useRef(false);

  useEffect(() => {
    if (!resizeHandle.current || !wrappingContainer?.current) {
      return;
    }

    const resizeHandleEl = resizeHandle.current;
    const wrapperEl = wrappingContainer.current;

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isResizing.current = true;

      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = size.width;
      const startHeight = size.height;

      // Mouse move handler
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isResizing.current) return;

        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);

        setSize({
          width: Math.max(100, newWidth), // Minimum width 100px
          height: Math.max(50, newHeight), // Minimum height 50px
        });
      };

      // Stop Resizing
      const handleMouseUp = () => {
        isResizing.current = false;
        wrapperEl.removeEventListener("mousemove", handleMouseMove);
        wrapperEl.removeEventListener("mouseup", handleMouseUp);
      };

      wrapperEl.addEventListener("mousemove", handleMouseMove);
      wrapperEl.addEventListener("mouseup", handleMouseUp);
    };

    resizeHandleEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      resizeHandleEl.removeEventListener("mousedown", handleMouseDown);
    };
  }, [resizeHandle, wrappingContainer, size]);

  return size;
};

export default useResize;
