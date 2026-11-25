import { useContext } from "react";
import clsx from "clsx";

import CanvasContext from "@/store/context";
import { textAreaFontColors } from "@/utils/config";

const ColorPalette = () => {
  const { textColor, setTextColor } = useContext(CanvasContext);

  const handleColorChange = (color: string) => () => {
    setTextColor(color);
  };

  return (
    <div className="color__palette">
      {textAreaFontColors.map(({ value, label }) => (
        <button
          aria-label={`text ${label}`}
          type="button"
          key={value}
          className={clsx(
            "color__button",
            textColor === value && "color__button--focused",
          )}
          onClick={handleColorChange(value)}
          style={{ backgroundColor: value }}
          aria-pressed={textColor === value}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
