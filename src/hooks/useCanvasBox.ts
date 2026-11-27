import { useState, useRef, useEffect, type FocusEvent } from "react";

import useResize from "@/hooks/useResize";
import useMove from "@/hooks/useMove";
import type { CanvasBoxType } from "@/utils/types";

export default function useCanvasBox(boxType: CanvasBoxType) {
  const [isSelected, setIsSelected] = useState(true);
  const resizeHandleRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveHandleRef = useRef<HTMLButtonElement>(null);
  const position = useMove(moveHandleRef);
  const size = useResize(resizeHandleRef, boxType);

  // A press inside the box selects it, a press anywhere else deselects it.
  // mousedown rather than click: a click that starts inside (e.g. selecting
  // text) and ends outside would land on a shared ancestor and deselect.
  const onWindowMouseDown = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      wrapperRef.current.contains(event.target as Node)
    ) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", onWindowMouseDown);

    return () => window.removeEventListener("mousedown", onWindowMouseDown);
  }, []);

  // Hide only when focus moves to another element outside. A null
  // relatedTarget (e.g. Safari doesn't focus buttons on click) is left to
  // the window mousedown listener, otherwise the buttons would vanish
  // mid-click.
  const onWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) {
      setIsSelected(false);
    }
  };
  // Keyboard users never trigger the mousedown listener, so focus moving
  // into the box must show its controls too.
  const onWrapperFocus = () => {
    setIsSelected(true);
  };

  return {
    wrapperRef,
    onWrapperBlur,
    onWrapperFocus,
    size,
    position,
    isSelected,
    moveHandleRef,
    resizeHandleRef,
  };
}
