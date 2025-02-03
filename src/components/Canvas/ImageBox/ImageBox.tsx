import { useContext, useEffect, useRef, useState } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import "./ImageBox.scss";

const ImageBox = () => {
  const { imageBoxBackground, canvasContainerRef } = useContext(CanvasContext);
  const [size, setSize] = useState({ width: 100, height: 100 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
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
      canvasContainerRef?.current?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      canvasContainerRef?.current?.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    canvasContainerRef?.current?.addEventListener("mousemove", handleMouseMove);
    canvasContainerRef?.current?.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="wrapper"
      tabIndex={-1}
      ref={wrapperRef}
      style={{ width: size.width, height: size.height }}
    >
      <TrashIcon className="icon delete-icon" />
      <Move className="icon move-icon" />
      <Atom className="icon resize-icon" onMouseDown={handleMouseDown} />

      <img
        src={imageBoxBackground}
        className="image-content"
        style={{ width: size.width, height: size.height }}
      />
    </div>
  );
};

export default ImageBox;
