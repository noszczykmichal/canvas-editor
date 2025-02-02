import { forwardRef, useContext } from "react";

import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import CanvasContext from "../../../store/context";
import { WrapperContentType } from "../../../types/types";
import "./ElementWrapper.scss";

interface ElementWrapperProps {
  contentType: WrapperContentType;
}

const ElementWrapper = forwardRef<HTMLDivElement, ElementWrapperProps>(
  ({ contentType }, ref) => {
    const { imageBoxBackground } = useContext(CanvasContext);

    return (
      <div
        className={`wrapper ${contentType === "text" && "wrapper--text-field"}`}
        tabIndex={-1}
        ref={ref}
      >
        <TrashIcon className="icon  delete-icon" />
        <Move className="icon move-icon" />
        <Atom className="icon resize-icon" />
        {contentType == "image" && (
          <img src={imageBoxBackground} className="image-content" />
        )}
        {contentType === "text" && (
          <textarea
            className="text-area"
            placeholder="Type in your text"
          ></textarea>
        )}
      </div>
    );
  }
);

export default ElementWrapper;
