import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTextColor, setTextColor } from "@/store/textColorSlice";
import { textAreaFontColors } from "@/utils/config";

const ColorPalette = () => {
  const textColor = useAppSelector(selectTextColor);
  const dispatch = useAppDispatch();

  const handleColorChange = (color: string) => () => {
    dispatch(setTextColor(color));
  };

  return (
    <div className="color__palette" role="group" aria-label="Text color">
      {textAreaFontColors.map(({ value, label }) => (
        <button
          aria-label={label}
          type="button"
          key={value}
          className={clsx(
            "color__button",
            textColor === value && "color__button--selected",
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
