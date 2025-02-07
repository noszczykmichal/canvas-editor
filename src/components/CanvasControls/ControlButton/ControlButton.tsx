/* eslint-disable no-nested-ternary */
import { FC, useContext } from "react";

import { ControlData } from "@utils/types";
import ControlIcon from "@components/CanvasControls/ControlButton/ControlIcon/ControlIcon";
import CanvasContext from "@store/context";
import "./ControlButton.scss";

const ControlButton: FC<ControlData> = ({ label, icon }) => {
  const {
    fileInputRef,
    isTextFieldAdded,
    imageBoxBackground,
    backgroundImage,
    setIsBackdropOpen,
    setIsTextFieldAdded,
  } = useContext(CanvasContext);

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

  const onClickHandler =
    icon === "textArea"
      ? textAreaHandler
      : icon === "image"
      ? imageHandler
      : backgroundHandler;

  const isDisabled =
    icon === "textArea"
      ? isTextFieldAdded
      : icon === "image"
      ? !!imageBoxBackground
      : !!backgroundImage;

  return (
    <button
      type="button"
      className="control-button"
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
};

export default ControlButton;
