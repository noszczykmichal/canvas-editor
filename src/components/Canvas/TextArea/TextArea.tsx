import { useState, useRef, useContext, useEffect } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import useResize from "../../../hooks/useResize";
import { textAreaFontColors } from "../../../utils/config";
import "./TextArea.scss";

const TextArea = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [textColor, setTextColor] = useState("#000000");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const { canvasContainerRef } = useContext(CanvasContext);
  const resizeHandle = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveHandleRef = useRef<SVGSVGElement>(null);
  const size = useResize(resizeHandle, canvasContainerRef, "textarea");

  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

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

  const handleColorChange = (color: string) => {
    setTextColor(color);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    isDragging.current = true;
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="wrapper"
      ref={wrapperRef}
      style={{
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <TrashIcon
        className={`${isFocused === true ? "icon--focused" : "icon"} delete-icon`}
      />
      <Move
        className={`${isFocused === true ? "icon--focused" : "icon"} move-icon`}
        onMouseDown={handleMouseDown}
        ref={moveHandleRef}
      />
      <Atom
        className={`${isFocused === true ? "icon--focused" : "icon"} resize-icon`}
        ref={resizeHandle}
      />
      <textarea
        className={`text-area ${isFocused && "text-area--focused"}`}
        style={{ color: `${textColor}` }}
        placeholder="Type your text here"
      ></textarea>
      {isFocused && (
        <div className="color__palette">
          {textAreaFontColors.map((color) => (
            <button
              key={color}
              className={`${textColor === color && "color__button--focused"} color__button`}
              onClick={() => handleColorChange(color)}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TextArea;
