import { FC, useContext } from "react";

import { ControlData } from "../../../types/types";
import ControlIcon from "./ControlIcon/ControlIcon";
import CanvasContext from "../../../store/context";
import "./ControlButton.scss";

const ControlButton: FC<ControlData> = ({ label, icon }) => {
  const { fileInputRef, setIsBackdropOpen } = useContext(CanvasContext);

  const imagePickHandler = () => {
    setIsBackdropOpen(true);
    fileInputRef?.current?.click();
  };

  const textAreaHandler = () => {
    setIsBackdropOpen(true);
    console.log("test");
  };

  return (
    <button
      className="button"
      onClick={icon === "backgroundColour" ? imagePickHandler : textAreaHandler}
    >
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
};

export default ControlButton;
