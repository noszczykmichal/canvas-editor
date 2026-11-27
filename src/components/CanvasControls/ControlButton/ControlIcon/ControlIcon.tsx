import { ControlsIcons } from "@/utils/types";
import TextIcon from "@/icons/TextIcon";
import ImageField from "@/icons/ImageField";
import BackgroundImage from "@/icons/BackgroundImage";
import "@/components/CanvasControls/ControlButton/ControlIcon/ControlIcon.scss";

interface ControlIconProps {
  iconType: ControlsIcons;
}

export default function ControlIcon({ iconType }: ControlIconProps) {
  let content;

  switch (iconType) {
    case "textArea":
      content = <TextIcon className="control-svg" />;
      break;
    case "image":
      content = <ImageField className="control-svg" />;
      break;
    case "background":
      content = <BackgroundImage className="control-svg" />;
      break;
    default:
      content = null;
  }

  return content;
}
