/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import CanvasContext from "@store/context";
import "./Backdrop.scss";

const Backdrop = () => {
  const { isBackdropOpen, setIsBackdropOpen, setIsModalOpen } =
    useContext(CanvasContext);
  const nodeRef = useRef<HTMLDivElement>(null);

  const onBackdropClick = () => {
    setIsBackdropOpen(false);
    setIsModalOpen(false);
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isBackdropOpen}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <div className="backdrop" onClick={onBackdropClick} ref={nodeRef} />
    </CSSTransition>
  );
};

export default Backdrop;
