import { useContext } from "react";

import CanvasContext from "@store/context";
import RefreshIcon from "@icons/RefreshIcon";
import "./ResetButton.scss";

const ResetButton = () => {
  const {
    isTextFieldAdded,
    imageBoxBackground,
    backgroundImage,
    setIsBackdropOpen,
    setIsModalOpen,
  } = useContext(CanvasContext);

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
};

export default ResetButton;
