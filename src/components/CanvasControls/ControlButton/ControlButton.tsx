import { FC } from "react";

import { ControlData } from "../../../types/types";
import ControlIcon from "./ControlIcon/ControlIcon";
import classes from "./ControlButton.module.scss";

const ControlButton: FC<ControlData> = ({ label, icon }) => {
  return (
    <button className={classes.button}>
      <ControlIcon iconType={icon} />
      {label}
    </button>
  );
};

export default ControlButton;
