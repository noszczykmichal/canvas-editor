import { useContext } from "react";

import CanvasContext from "../store/context";

export const handleFocusBack = () => {
  setIsBackdropOpen(false);
  window.removeEventListener("focus", handleFocusBack);
};

export const onInputClick = () => {
  window.addEventListener("focus", handleFocusBack);
};
