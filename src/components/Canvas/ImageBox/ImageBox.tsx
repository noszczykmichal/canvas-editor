import { useContext } from "react";
import { flushSync } from "react-dom";
import clsx from "clsx";

import TrashIcon from "@/icons/TrashIcon";
import Atom from "@/icons/Atom";
import Move from "@/icons/Move";
import Button from "@/components/ui/Button/Button";
import CanvasContext from "@/store/context";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import useCanvasBox from "@/hooks/useCanvasBox";
import "@/components/Canvas/ImageBox/ImageBox.scss";

export default function ImageBox() {
  const { addImageButtonRef } = useContext(CanvasContext);
  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );
  const {
    isSelected,
    resizeHandleRef,
    size,
    wrapperRef,
    moveHandleRef,
    position,
    onWrapperBlur,
    onWrapperFocus,
  } = useCanvasBox("image");
  const { setImageBoxBackground } = uiSliceActions;
  const dispatch = useAppDispatch();

  const onTrashIconClick = () => {
    flushSync(() => dispatch(setImageBoxBackground("")));
    addImageButtonRef.current?.focus();
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
      <Button
        className={clsx(
          "delete-icon",
          isSelected ? "action-button--focused" : "action-button",
        )}
        onClick={onTrashIconClick}
        ariaLabel="Delete image box"
      >
        <TrashIcon />
      </Button>
      <Button
        className={clsx(
          "move-icon",
          isSelected ? "action-button--focused" : "action-button",
        )}
        ref={moveHandleRef}
        ariaLabel="Move image box"
      >
        <Move />
      </Button>
      <Button
        className={clsx(
          "resize-icon",
          isSelected ? "action-button--focused" : "action-button",
        )}
        ref={resizeHandleRef}
        ariaLabel="Resize image box"
      >
        <Atom />
      </Button>

      <img
        src={imageBoxBackground}
        className={clsx(
          "image-content",
          isSelected && "image-content--selected",
        )}
        style={{ width: size.width, height: size.height }}
        alt=""
      />
    </div>
  );
}
