import {
  useState,
  useRef,
  useContext,
  useEffect,
  type FocusEvent,
} from "react";

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

export default function TextArea() {
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

  // Keyboard users never trigger the canvas mousedown listener, so focus
  // moving into the text box must show its controls too.
  const onWrapperFocus = () => {
    setIsFocused(true);
  };

  // Hide only when focus moves to another element outside. A null
  // relatedTarget (e.g. Safari doesn't focus buttons on click) is left to
  // the mousedown logic, otherwise the buttons would vanish mid-click.
  const onWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className="wrapper"
      ref={wrapperRef}
      onFocus={onWrapperFocus}
      onBlur={onWrapperBlur}
      style={{
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* The text field comes first so Tab moves from it to its actions. */}
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

      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "delete-icon",
        )}
        onClick={onTrashIconClick}
        ariaLabel="Delete text box"
      >
        <TrashIcon />
      </Button>
      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "move-icon",
        )}
        ref={moveHandleRef}
        ariaLabel="Move text box"
      >
        <Move />
      </Button>

      <Button
        className={clsx(
          isFocused === true ? "action-button--focused" : "action-button",
          "resize-icon",
        )}
        ref={resizeHandle}
        ariaLabel="Resize text box"
      >
        <Atom />
      </Button>

      {isFocused && <ColorPalette />}
    </div>
  );
}
