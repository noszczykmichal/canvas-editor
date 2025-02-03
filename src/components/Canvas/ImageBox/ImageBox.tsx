import { useContext, useEffect, useRef } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import "./ImageBox.scss";

const ImageBox = () => {
  const { imageBoxBackground } = useContext(CanvasContext);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  return (
    <div className="wrapper" tabIndex={-1} ref={wrapperRef}>
      <TrashIcon className="icon  delete-icon" />
      <Move className="icon move-icon" />
      <Atom className="icon resize-icon" />

      <img src={imageBoxBackground} className="image-content" />
    </div>
  );
};

export default ImageBox;
