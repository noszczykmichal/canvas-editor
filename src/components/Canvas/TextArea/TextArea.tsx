import { useState, useRef, useContext, useEffect } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import { textAreaFontColors } from "../../../utils/config";
import useResize from "../../../hooks/useResize";
import useMove from "../../../hooks/useMove";
import "./TextArea.scss";

const TextArea = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [textColor, setTextColor] = useState("#000000");
  const { canvasContainerRef, setIsTextFieldAdded } = useContext(CanvasContext);
  const resizeHandle = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveHandleRef = useRef<SVGSVGElement>(null);
  const position = useMove(moveHandleRef, canvasContainerRef);
  const size = useResize(resizeHandle, canvasContainerRef, "textarea");

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

  const onTrashIconClick = () => {
    setIsTextFieldAdded(false);
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
        onClick={onTrashIconClick}
      />
      <Move
        className={`${isFocused === true ? "icon--focused" : "icon"} move-icon`}
        ref={moveHandleRef}
      />
      <Atom
        className={`${isFocused === true ? "icon--focused" : "icon"} resize-icon`}
        ref={resizeHandle}
      />
      <textarea
        className={`text-area ${isFocused && "text-area--focused"}`}
        style={{
          color: `${textColor}`,
          fontSize: `${Math.max(32, size.height * 0.25)}px`,
        }}
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
