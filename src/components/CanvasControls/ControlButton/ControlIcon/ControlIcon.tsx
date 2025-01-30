import { FC } from "react";

import { ControlsIcons } from "../../../../types/types";
import TextArea from "../../../../icons/TextArea";
import BackgroundImage from "../../../../icons/BackgroundImage";
import BackgroundColour from "../../../../icons/BackgroundColour";
import classes from "./ControlIcon.module.scss";

interface ControlIconProps {
  iconType: ControlsIcons;
}

const ControlIcon: FC<ControlIconProps> = ({ iconType }) => {
  let content;

  switch (iconType) {
    case "textArea":
      content = <TextArea classNames={classes["control-svg"]} />;
      break;
    case "backgroundImage":
      content = <BackgroundImage classNames={classes["control-svg"]} />;
      break;
    case "backgroundColour":
      content = <BackgroundColour classNames={classes["control-svg"]} />;
      break;
    default:
      content = null;
  }

  return content;
};

export default ControlIcon;
