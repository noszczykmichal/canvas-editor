import { RefObject, useEffect, useRef, useState } from "react";

/**
 * Tracks a value that changes while `handle` is dragged. Pointer events cover
 * mouse, touch and pen. `compute` must be stable (e.g. module-level) and gets
 * the value at drag start plus the pointer offset since then.
 */
const useDrag = <T>(
  handle: RefObject<Element | null>,
  initialValue: T,
  compute: (start: T, dx: number, dy: number) => T,
) => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(initialValue);

  useEffect(() => {
    const el = handle.current as HTMLElement | null;
    if (!el) {
      return undefined;
    }

    // Without this, touch drags scroll the page and fire pointercancel.
    el.style.touchAction = "none";

    const onPointerDown = (down: PointerEvent) => {
      down.preventDefault();
      el.setPointerCapture(down.pointerId);
      const start = valueRef.current;

      const onPointerMove = (move: PointerEvent) => {
        valueRef.current = compute(
          start,
          move.clientX - down.clientX,
          move.clientY - down.clientY,
        );
        setValue(valueRef.current);
      };

      const onPointerUp = () => {
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
      };

      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("pointercancel", onPointerUp);
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => el.removeEventListener("pointerdown", onPointerDown);
  }, [handle, compute]);

  return value;
};

export default useDrag;
