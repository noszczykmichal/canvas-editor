import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import CanvasContext from "../../../store/context";
import "./Modal.scss";

const Modal = () => {
  const { isModalOpen } = useContext(CanvasContext);
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={isModalOpen}
      timeout={300}
      classNames="fade-down"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="modal" ref={nodeRef}>
        Modal
      </div>
    </CSSTransition>
  );
};

export default Modal;
