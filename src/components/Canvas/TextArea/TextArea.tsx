import { useState, useRef, useContext, useEffect } from "react";

import TrashIcon from "@/icons/TrashIcon";
import Atom from "@/icons/Atom";
import Move from "@/icons/Move";
import CanvasContext from "@/store/context";
import useResize from "@/hooks/useResize";
import useMove from "@/hooks/useMove";
import ColorPalette from "@/components/Canvas/TextArea/ColorPalette/ColorPalette";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";
import "@/components/Canvas/TextArea/TextArea.scss";

const TextArea = () => {
  const [isFocused, setIsFocused] = useState(true);
  const {
    setIsTextFieldAdded,
    textColor,
    canvasContainerRef,
    textAreaRef,
    textAreaDivCloneRef,
  } = useContext(CanvasContext);
  const resizeHandle = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveHandleRef = useRef<HTMLButtonElement>(null);
  const position = useMove(moveHandleRef);
  const size = useResize(resizeHandle, "textarea");

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
    const canvasContainer = canvasContainerRef?.current;

    if (!canvasContainer) return undefined;

    canvasContainer.addEventListener("mousedown", handleBlurAndFocus);

    return () =>
      canvasContainer?.removeEventListener("mousedown", handleBlurAndFocus);
  }, [canvasContainerRef]);

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
      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "delete-icon",
        )}
        onClick={onTrashIconClick}
        ariaLabel="delete textarea"
      >
        <TrashIcon />
      </Button>
      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "move-icon",
        )}
        ref={moveHandleRef}
        ariaLabel="move textarea"
      >
        <Move />
      </Button>

      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "resize-icon",
        )}
        ref={resizeHandle}
        ariaLabel="resize textarea"
      >
        <Atom />
      </Button>

      <textarea
        className={`text-area${isFocused ? " text-area--focused" : ""}`}
        style={{
          color: `${textColor}`,
          fontSize: `${Math.max(32, size.height * 0.2)}px`,
        }}
        placeholder="Type your text here"
        ref={textAreaRef}
        aria-label="Type your text here"
      />

      <div
        className={`text-area${isFocused ? " text-area--focused" : ""}`}
        style={{
          color: `${textColor}`,
          fontSize: `${Math.max(32, size.height * 0.2)}px`,
          display: "none",
        }}
        ref={textAreaDivCloneRef}
      />
      {isFocused && <ColorPalette />}
    </div>
  );
};

export default TextArea;
