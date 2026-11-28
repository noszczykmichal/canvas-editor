/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import "@/components/ui/Backdrop/Backdrop.scss";

export default function Backdrop() {
  const isBackdropOpen = useAppSelector((state) => state.ui.isBackdropOpen);
  const { setIsBackdropOpen, setIsModalOpen } = uiSliceActions;
  const dispatch = useAppDispatch();
  const nodeRef = useRef<HTMLDivElement>(null);

  const onBackdropClick = () => {
    dispatch(setIsBackdropOpen(false));
    dispatch(setIsModalOpen(false));
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
}
