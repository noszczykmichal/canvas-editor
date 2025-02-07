import { controlsConfig } from "@utils/config";
import ControlButton from "@components/CanvasControls/ControlButton/ControlButton";
import "./Controls.scss";

const Controls = () => {
  return (
    <div className="controls">
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
