import { useContext, useEffect, useRef } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import useResize from "../../../hooks/useResize";
import "./ImageBox.scss";

const ImageBox = () => {
  const { imageBoxBackground, canvasContainerRef } = useContext(CanvasContext);
  const resizeHandle = useRef<SVGSVGElement>(null);
  const size = useResize(resizeHandle, canvasContainerRef);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  return (
    <div
      className="wrapper"
      tabIndex={-1}
      ref={wrapperRef}
      style={{ width: size.width, height: size.height }}
    >
      <TrashIcon className="icon delete-icon" />
      <Move className="icon move-icon" />
      <Atom className="icon resize-icon" ref={resizeHandle} />

      <img
        src={imageBoxBackground}
        className="image-content"
        style={{ width: size.width, height: size.height }}
      />
    </div>
  );
};

export default ImageBox;
