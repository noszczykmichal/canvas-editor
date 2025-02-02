import { FC } from "react";

import { ControlsIcons } from "../../../../types/types";
import TextArea from "../../../../icons/TextArea";
import ImageField from "../../../../icons/ImageField";
import BackgroundImage from "../../../../icons/BackgroundImage";
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
    case "image":
      content = <ImageField classNames="control-svg" />;
      break;
    case "background":
      content = <BackgroundImage classNames="control-svg" />;
      break;
    default:
      content = null;
  }

  return content;
};

export default ControlIcon;
