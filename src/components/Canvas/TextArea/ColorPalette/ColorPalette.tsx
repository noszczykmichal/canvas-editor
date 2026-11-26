import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { textAreaFontColors } from "@/utils/config";
import { uiSliceActions } from "@/store/uiSlice";

export default function ColorPalette() {
  const textColor = useAppSelector((store) => store.ui.textColor);
  const { setTextColor } = uiSliceActions;
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
}
