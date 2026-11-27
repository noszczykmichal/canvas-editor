import { useContext } from "react";
import { flushSync } from "react-dom";
import clsx from "clsx";

import TrashIcon from "@/icons/TrashIcon";
import Atom from "@/icons/Atom";
import Move from "@/icons/Move";
import ColorPalette from "@/components/Canvas/TextArea/ColorPalette/ColorPalette";
import Button from "@/components/ui/Button/Button";
import CanvasContext from "@/store/context";
import { useAppSelector } from "@/store/hooks";
import useCanvasBox from "@/hooks/useCanvasBox";
import "@/components/Canvas/TextArea/TextArea.scss";

export default function TextArea() {
  const textColor = useAppSelector((state) => state.ui.textColor);
  const {
    setIsTextFieldAdded,
    textAreaRef,
    textAreaDivCloneRef,
    addTextButtonRef,
  } = useContext(CanvasContext);
  const {
    wrapperRef,
    onWrapperBlur,
    onWrapperFocus,
    size,
    position,
    isSelected,
    moveHandleRef,
    resizeHandleRef,
  } = useCanvasBox("textarea");

  // The focused delete button disappears with the text box, which would drop
  // focus to <body>. Hand it to the "text" control instead. flushSync applies
  // the state change right away: the control is disabled until then, and a
  // disabled button can't take focus.
  const onTrashIconClick = () => {
    flushSync(() => setIsTextFieldAdded(false));
    addTextButtonRef.current?.focus();
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
        className={clsx("text-area", isSelected && "text-area--selected")}
        style={{
          color: textColor,
          fontSize: `${Math.max(32, size.height * 0.2)}px`,
        }}
        placeholder="Type your text here"
        ref={textAreaRef}
        aria-label="Type your text here"
      />

      <div
        className={clsx("text-area", isSelected && "text-area--selected")}
        style={{
          color: textColor,
          fontSize: `${Math.max(32, size.height * 0.2)}px`,
          display: "none",
        }}
        ref={textAreaDivCloneRef}
      />

      <Button
        className={clsx(
          "delete-icon",
          isSelected ? "action-button--selected" : "action-button",
        )}
        onClick={onTrashIconClick}
        ariaLabel="Delete text box"
      >
        <TrashIcon />
      </Button>
      <Button
        className={clsx(
          "move-icon",
          isSelected ? "action-button--selected" : "action-button",
        )}
        ref={moveHandleRef}
        ariaLabel="Move text box"
      >
        <Move />
      </Button>
      <Button
        className={clsx(
          "resize-icon",
          isSelected ? "action-button--selected" : "action-button",
        )}
        ref={resizeHandleRef}
        ariaLabel="Resize text box"
      >
        <Atom />
      </Button>

      {isSelected && <ColorPalette />}
    </div>
  );
}
