import { FC, useContext } from "react";

import { ControlData } from "../../../types/types";
import ControlIcon from "./ControlIcon/ControlIcon";
import CanvasContext from "../../../store/context";
import classes from "./ControlButton.module.scss";

const ControlButton: FC<ControlData> = ({ label, icon }) => {
  const { fileInputRef } = useContext(CanvasContext);

  const imagePickHandler = () => {
    fileInputRef?.current?.click();

    // let canvas = document.createElement("canvas");

    // canvasContainerRef?.current?.appendChild(canvas)
  };

  const textAreaHandler = () => {
    console.log("test");
  };

  return (
    <button
      className={classes.button}
      onClick={icon === "backgroundColour" ? imagePickHandler : textAreaHandler}
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
};

export default ControlButton;
