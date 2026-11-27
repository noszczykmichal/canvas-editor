import { useContext } from "react";

import CanvasContext from "@/store/context";

export default function useFocusBack() {
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
}
