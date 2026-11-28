import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Warning from "@/icons/Warning";
import CloseIcon from "@/icons/CloseIcon";
import { uiSliceActions } from "@/store/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "@/components/ui/Modal/Modal.scss";

export default function Modal() {
  const isModalOpen = useAppSelector((state) => state.ui.isModalOpen);
  const nodeRef = useRef(null);
  const {
    setBackgroundImage,
    setImageBoxBackground,
    setIsBackdropOpen,
    setIsModalOpen,
    setIsTextFieldAdded,
  } = uiSliceActions;
  const dispatch = useAppDispatch();

  const onCancelHandler = () => {
    dispatch(setIsBackdropOpen(false));
    dispatch(setIsModalOpen(false));
  };

  const onResetHandler = () => {
    dispatch(setIsTextFieldAdded(false));
    dispatch(setImageBoxBackground(""));
    dispatch(setBackgroundImage(""));
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
          <h2 className="wrapper__title">Warning</h2>
          <p className="wrapper__text">
            You’re about to reset whole process. Are you sure you want to do it?
          </p>
        </div>
        <div className="modal__controls">
          <button
            type="button"
            onClick={onCancelHandler}
            className="controls__button"
          >
            Cancel
          </button>
          <button
            type="button"
            className="controls__button controls__button--violette primary-button"
            onClick={onResetHandler}
          >
            Reset
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}
