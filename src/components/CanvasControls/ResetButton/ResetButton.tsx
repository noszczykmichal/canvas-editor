import { useContext } from "react";

import CanvasContext from "../../../store/context";
import RefreshIcon from "../../../icons/RefreshIcon";
import "./ResetButton.scss";

const ResetButton = () => {
  const { setIsBackdropOpen, setIsModalOpen } = useContext(CanvasContext);

  const onResetButtonClick = () => {
    setIsBackdropOpen(true);
    setIsModalOpen(true);
  };
  return (
    <button type="button" className="reset-button" onClick={onResetButtonClick}>
      Reset
      <RefreshIcon />
    </button>
  );
};

export default ResetButton;
