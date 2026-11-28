import RefreshIcon from "@/icons/RefreshIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import "@/components/CanvasControls/ResetButton/ResetButton.scss";

export default function ResetButton() {
  const isTextFieldAdded = useAppSelector((state) => state.ui.isTextFieldAdded);
  const { setIsBackdropOpen, setIsModalOpen } = uiSliceActions;
  const dispatch = useAppDispatch();

  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );

  const backgroundImage = useAppSelector((state) => state.ui.backgroundImage);

  const onResetButtonClick = () => {
    dispatch(setIsBackdropOpen(true));
    dispatch(setIsModalOpen(true));
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
