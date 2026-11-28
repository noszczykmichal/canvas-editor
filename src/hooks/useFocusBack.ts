import { useAppDispatch } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";

export default function useFocusBack() {
  const dispatch = useAppDispatch();
  const { setIsBackdropOpen } = uiSliceActions;

  const handleFocusBack = () => {
    dispatch(setIsBackdropOpen(false));
    window.removeEventListener("focus", handleFocusBack);
  };

  const addWindowListener = () => {
    dispatch(setIsBackdropOpen(true));
    window.addEventListener("focus", handleFocusBack);
  };

  return { handleFocusBack, addWindowListener };
}
