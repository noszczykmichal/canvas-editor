import {
  useState,
  useRef,
  useContext,
  useEffect,
  type FocusEvent,
} from "react";

import CanvasContext from "@/store/context";
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
  const { canvasContainerRef } = useContext(CanvasContext);

  const handleBlurAndFocus = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsSelected(false);
      return;
    }
    setIsSelected(true);
  };

  useEffect(() => {
    const canvasContainer = canvasContainerRef?.current;

    if (!canvasContainer) return undefined;

    canvasContainer.addEventListener("mousedown", handleBlurAndFocus);

    return () =>
      canvasContainer?.removeEventListener("mousedown", handleBlurAndFocus);
  }, [canvasContainerRef]);

  // Hide only when focus moves to another element outside. A null
  // relatedTarget (e.g. Safari doesn't focus buttons on click) is left to
  // the mousedown logic, otherwise the buttons would vanish mid-click.
  const onWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) {
      setIsSelected(false);
    }
  };
  // Keyboard users never trigger the canvas mousedown listener, so focus
  // moving into the text box must show its controls too.
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
