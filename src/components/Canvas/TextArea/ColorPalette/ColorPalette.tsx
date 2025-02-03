import { useContext } from "react";

import CanvasContext from "../../../../store/context";
import { textAreaFontColors } from "../../../../utils/config";

const ColorPalette = () => {
  const { textColor, setTextColor } = useContext(CanvasContext);

  const handleColorChange = (color: string) => {
    setTextColor(color);
  };

  return (
    <div className="color__palette">
      {textAreaFontColors.map((color) => (
        <button
          key={color}
          className={`${textColor === color && "color__button--focused"} color__button`}
          onClick={() => handleColorChange(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
