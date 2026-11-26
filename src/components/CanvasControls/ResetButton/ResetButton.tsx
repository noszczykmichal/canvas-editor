import { useContext } from "react";

import CanvasContext from "@/store/context";
import RefreshIcon from "@/icons/RefreshIcon";
import { useAppSelector } from "@/store/hooks";
import "./ResetButton.scss";

export default function ResetButton() {
  const { isTextFieldAdded, setIsBackdropOpen, setIsModalOpen } =
    useContext(CanvasContext);

  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );

  const backgroundImage = useAppSelector((state) => state.ui.backgroundImage);

  const onResetButtonClick = () => {
    setIsBackdropOpen(true);
    setIsModalOpen(true);
  };

  const isResetDisabled = !(
    isTextFieldAdded ||
    !!imageBoxBackground ||
    !!backgroundImage
  );

  return (
    <button
      type="button"
      className="reset-button"
      onClick={onResetButtonClick}
      disabled={isResetDisabled}
    >
      Reset
      <RefreshIcon />
    </button>
  );
}
