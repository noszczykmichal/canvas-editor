import { useContext } from "react";

import CanvasContext from "../store/context";

const useFocusBack = () => {
  const { setIsBackdropOpen } = useContext(CanvasContext);

  const handleFocusBack = () => {
    setIsBackdropOpen(false);
    window.removeEventListener("focus", handleFocusBack);
  };

  const addWindowListener = () => {
    setIsBackdropOpen(true);
    window.addEventListener("focus", handleFocusBack);
  };

  return { handleFocusBack, addWindowListener };
};

export default useFocusBack;
