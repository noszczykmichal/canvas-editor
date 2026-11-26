import { useContext } from "react";

import { ControlData } from "@/utils/types";
import ControlIcon from "@/components/CanvasControls/ControlButton/ControlIcon/ControlIcon";
import CanvasContext from "@/store/context";
import { useAppSelector } from "@/store/hooks";
import "./ControlButton.scss";

export default function ControlButton({ label, icon }: ControlData) {
  const {
    fileInputRef,
    isTextFieldAdded,
    addTextButtonRef,
    setIsBackdropOpen,
    setIsTextFieldAdded,
  } = useContext(CanvasContext);

  const backgroundImage = useAppSelector((state) => state.ui.backgroundImage);
  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );

  const textAreaHandler = () => {
    setIsTextFieldAdded(true);
  };

  const imageHandler = () => {
    setIsBackdropOpen(true);
    fileInputRef?.current?.click();
    fileInputRef?.current?.setAttribute("data-source", "imageBox");
  };

  const backgroundHandler = () => {
    setIsBackdropOpen(true);
    fileInputRef?.current?.click();
    fileInputRef?.current?.setAttribute("data-source", "background");
  };

  let onClickHandler;
  if (icon === "textArea") {
    onClickHandler = textAreaHandler;
  } else if (icon === "image") {
    onClickHandler = imageHandler;
  } else {
    onClickHandler = backgroundHandler;
  }

  let isDisabled;

  if (icon === "textArea") {
    isDisabled = isTextFieldAdded;
  } else if (icon === "image") {
    isDisabled = !!imageBoxBackground;
  } else {
    isDisabled = !!backgroundImage;
  }

  return (
    <button
      type="button"
      className="control-button"
      // TextArea moves focus here after it is deleted.
      ref={icon === "textArea" ? addTextButtonRef : undefined}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
}
