import { RefObject, useContext } from "react";

import type { ControlData, ControlsIcons } from "@/utils/types";
import ControlIcon from "@/components/CanvasControls/ControlButton/ControlIcon/ControlIcon";
import CanvasContext from "@/store/context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import "@/components/CanvasControls/ControlButton/ControlButton.scss";

export default function ControlButton({ label, icon }: ControlData) {
  const { fileInputRef, addTextButtonRef, addImageButtonRef } =
    useContext(CanvasContext);
  const { setIsBackdropOpen, setIsTextFieldAdded } = uiSliceActions;
  const dispatch = useAppDispatch();

  const isTextFieldAdded = useAppSelector((state) => state.ui.isTextFieldAdded);
  const backgroundImage = useAppSelector((state) => state.ui.backgroundImage);
  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );

  const textAreaHandler = () => {
    dispatch(setIsTextFieldAdded(true));
  };

  const imageHandler = () => {
    dispatch(setIsBackdropOpen(true));
    fileInputRef?.current?.click();
    fileInputRef?.current?.setAttribute("data-source", "imageBox");
  };

  const backgroundHandler = () => {
    dispatch(setIsBackdropOpen(true));
    fileInputRef?.current?.click();
    fileInputRef?.current?.setAttribute("data-source", "background");
  };

  // Each control is disabled while its element is on the canvas. TextArea and
  // ImageBox focus their control through the ref after being deleted.
  const controls: Record<
    ControlsIcons,
    {
      onClick: () => void;
      isDisabled: boolean;
      ref?: RefObject<HTMLButtonElement | null>;
    }
  > = {
    textArea: {
      onClick: textAreaHandler,
      isDisabled: isTextFieldAdded,
      ref: addTextButtonRef,
    },
    image: {
      onClick: imageHandler,
      isDisabled: !!imageBoxBackground,
      ref: addImageButtonRef,
    },
    background: {
      onClick: backgroundHandler,
      isDisabled: !!backgroundImage,
    },
  };
  const control = controls[icon];

  return (
    <button
      type="button"
      className="control-button"
      ref={control.ref}
      onClick={control.onClick}
      disabled={control.isDisabled}
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
}
