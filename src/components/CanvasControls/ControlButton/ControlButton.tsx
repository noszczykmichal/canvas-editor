/* eslint-disable no-nested-ternary */
import { FC, useContext } from "react";

import { ControlData } from "../../../types/types";
import ControlIcon from "./ControlIcon/ControlIcon";
import CanvasContext from "../../../store/context";
import "./ControlButton.scss";

const ControlButton: FC<ControlData> = ({ label, icon }) => {
  const { fileInputRef, setIsBackdropOpen, setIsTextFieldAdded } =
    useContext(CanvasContext);

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

  return (
    <button
      type="button"
      className="control-button"
      onClick={
        icon === "textArea"
          ? textAreaHandler
          : icon === "image"
          ? imageHandler
          : backgroundHandler
      }
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
};

export default ControlButton;
