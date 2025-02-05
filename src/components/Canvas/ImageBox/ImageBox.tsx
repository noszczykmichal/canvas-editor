import { useContext, useEffect, useRef } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import useResize from "../../../hooks/useResize";
import useMove from "../../../hooks/useMove";
import "./ImageBox.scss";

const ImageBox = () => {
  const { imageBoxBackground, setImageBoxBackground, canvasContainerRef } =
    useContext(CanvasContext);
  const resizeHandle = useRef<SVGSVGElement | null>(null);
  const size = useResize(resizeHandle, canvasContainerRef, "image");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveHandleRef = useRef<SVGSVGElement>(null);
  const position = useMove(moveHandleRef, canvasContainerRef);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  const onTrashIconClick = () => {
    setImageBoxBackground("");
  };

  return (
    <div
      className="wrapper"
      tabIndex={-1}
      ref={wrapperRef}
      style={{
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <TrashIcon className="icon delete-icon" onClick={onTrashIconClick} />
      <Move className="icon move-icon" ref={moveHandleRef} />
      <Atom className="icon resize-icon" ref={resizeHandle} />

      <img
        src={imageBoxBackground}
        className="image-content"
        style={{ width: size.width, height: size.height }}
        alt=""
      />
    </div>
  );
};

export default ImageBox;
