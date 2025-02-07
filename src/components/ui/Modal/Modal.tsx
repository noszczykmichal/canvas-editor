import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import CanvasContext from "@store/context";
import Warning from "@icons/Warning";
import CloseIcon from "@icons/CloseIcon";
import "./Modal.scss";

const Modal = () => {
  const {
    isModalOpen,
    setIsBackdropOpen,
    setIsModalOpen,
    setBackgroundImage,
    setIsTextFieldAdded,
    setImageBoxBackground,
  } = useContext(CanvasContext);
  const nodeRef = useRef(null);

  const onCancelHandler = () => {
    setIsBackdropOpen(false);
    setIsModalOpen(false);
  };

  const onResetHandler = () => {
    setIsTextFieldAdded(false);
    setImageBoxBackground("");
    setBackgroundImage("");
    onCancelHandler();
  };

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
        <header className="modal__header">
          <button
            type="button"
            className="header__close-button"
            onClick={onCancelHandler}
          >
            <CloseIcon />
          </button>
        </header>
        <div className="modal__wrapper">
          <Warning />
          <h2 className="modal__title">Warning</h2>
          <p className="modal__text">
            You’re about to reset whole process. Are you sure you want to do it?
          </p>
        </div>
        <div className="modal-controls">
          <button
            type="button"
            onClick={onCancelHandler}
            className="modal-controls__button"
          >
            Cancel
          </button>
          <button
            type="button"
            className="modal-controls__button modal-controls__button--violette primary-button"
            onClick={onResetHandler}
          >
            Reset
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
