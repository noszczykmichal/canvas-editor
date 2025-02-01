import { FC } from "react";

import { ControlsIcons } from "../../../../types/types";
import TextArea from "../../../../icons/TextArea";
import BackgroundImage from "../../../../icons/BackgroundImage";
import BackgroundColour from "../../../../icons/BackgroundColour";
import "./ControlIcon.scss";

interface ControlIconProps {
  iconType: ControlsIcons;
}

const ControlIcon: FC<ControlIconProps> = ({ iconType }) => {
  let content;

  switch (iconType) {
    case "textArea":
      content = <TextArea classNames="control-svg" />;
      break;
    case "backgroundImage":
      content = <BackgroundImage classNames="control-svg" />;
      break;
    case "backgroundColour":
      content = <BackgroundColour classNames="control-svg" />;
      break;
    default:
      content = null;
  }

  return content;
};

export default ControlIcon;
