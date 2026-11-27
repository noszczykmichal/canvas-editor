import { useContext } from "react";
import clsx from "clsx";
import { flushSync } from "react-dom";

import TrashIcon from "@/icons/TrashIcon";
import Atom from "@/icons/Atom";
import Move from "@/icons/Move";
import Button from "@/components/ui/Button/Button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import CanvasContext from "@/store/context";
import "@/components/Canvas/ImageBox/ImageBox.scss";
import useCanvasBox from "@/hooks/useCanvasBox";

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
          isSelected ? "action-button--focused" : "action-button",
          "delete-icon",
        )}
        onClick={onTrashIconClick}
        ariaLabel="Delete Image"
      >
        <TrashIcon />
      </Button>
      <Button
        className={clsx(
          isSelected ? "action-button--focused" : "action-button",
          "move-icon",
        )}
        ref={moveHandleRef}
        ariaLabel="Move Image"
      >
        <Move />
      </Button>
      <Button
        className={clsx(
          isSelected ? "action-button--focused" : "action-button",
          "resize-icon",
        )}
        ref={resizeHandleRef}
        ariaLabel="Resize Image"
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
