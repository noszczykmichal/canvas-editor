import { useState, useRef, useContext, useEffect } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import "./TextArea.scss";

const TextArea = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [size, setSize] = useState({ width: 320, height: 120 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { canvasContainerRef } = useContext(CanvasContext);
  // const isResizing = useRef(false);

  const handleBlurAndFocus = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
      return;
    }
    setIsFocused(true);
  };

  useEffect(() => {
    canvasContainerRef?.current?.addEventListener(
      "mousedown",
      handleBlurAndFocus
    );
  }, [canvasContainerRef]);

  // const handleMouseDown = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   isResizing.current = true;

  //   const startX = event.clientX;
  //   const startY = event.clientY;
  //   const startWidth = size.width;
  //   const startHeight = size.height;

  //   // Mouse move handler
  //   const handleMouseMove = (moveEvent: MouseEvent) => {
  //     if (!isResizing.current) return;

  //     const newWidth = startWidth + (moveEvent.clientX - startX);
  //     const newHeight = startHeight + (moveEvent.clientY - startY);

  //     setSize({
  //       width: Math.max(100, newWidth), // Minimum width 100px
  //       height: Math.max(50, newHeight), // Minimum height 50px
  //     });
  //   };

  //   // Stop Resizing
  //   const handleMouseUp = () => {
  //     isResizing.current = false;
  //     canvasContainerRef?.current?.removeEventListener(
  //       "mousemove",
  //       handleMouseMove
  //     );
  //     canvasContainerRef?.current?.removeEventListener(
  //       "mouseup",
  //       handleMouseUp
  //     );
  //   };

  //   canvasContainerRef?.current?.addEventListener("mousemove", handleMouseMove);
  //   canvasContainerRef?.current?.addEventListener("mouseup", handleMouseUp);
  // };

  return (
    <div
      className="wrapper"
      ref={wrapperRef}
      style={{ width: size.width, height: size.height }}
    >
      <TrashIcon
        className={`${isFocused === true ? "icon--focused" : "icon"} delete-icon`}
      />
      <Move
        className={`${isFocused === true ? "icon--focused" : "icon"} move-icon`}
      />
      <Atom
        className={`${isFocused === true ? "icon--focused" : "icon"} resize-icon`}
        // onMouseDown={handleMouseDown}
      />
      <textarea
        className={`text-area ${isFocused && "text-area--focused"}`}
        placeholder="Type your text here"
      ></textarea>
    </div>
  );
};

export default TextArea;
