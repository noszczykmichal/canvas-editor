import { ControlData } from "../../../types/types";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./Controls.module.scss";

const controlsConfig: ControlData[] = [
  { label: "text", icon: "textArea" },
  { label: "image", icon: "backgroundImage" },
  { label: "background", icon: "backgroundColour" },
];

const Controls = () => {
  return (
    <div className={classes["controls__buttons"]}>
      {controlsConfig.map((button) => (
        <ControlButton
          key={button.label}
          label={button.label}
          icon={button.icon}
        />
      ))}
    </div>
  );
};

export default Controls;
