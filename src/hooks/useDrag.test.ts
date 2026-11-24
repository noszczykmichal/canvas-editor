import { describe, expect, it } from "vitest";
import { act, fireEvent, renderHook } from "@testing-library/react";

import useMove from "@/hooks/useMove";
import useResize from "@/hooks/useResize";

const createHandle = () => {
  const handle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // jsdom doesn't implement pointer capture.
  handle.setPointerCapture = () => {};
  document.body.appendChild(handle);
  return handle;
};

const drag = (handle: Element, from: number[], ...to: number[][]) => {
  act(() => {
    fireEvent.pointerDown(handle, { clientX: from[0], clientY: from[1] });
    to.forEach(([clientX, clientY]) =>
      fireEvent.pointerMove(handle, { clientX, clientY }),
    );
    fireEvent.pointerUp(handle);
  });
};

describe("useMove", () => {
  it("moves by the drag offset and continues from there on the next drag", () => {
    const handle = createHandle();
    const { result } = renderHook(() => useMove({ current: handle }));

    drag(handle, [10, 10], [40, 30]);
    expect(result.current).toEqual({ x: 30, y: 20 });

    drag(handle, [0, 0], [5, -5]);
    expect(result.current).toEqual({ x: 35, y: 15 });
  });

  it("ignores pointer moves after pointerup", () => {
    const handle = createHandle();
    const { result } = renderHook(() => useMove({ current: handle }));

    drag(handle, [10, 10], [40, 30]);
    act(() => {
      fireEvent.pointerMove(handle, { clientX: 200, clientY: 200 });
    });

    expect(result.current).toEqual({ x: 30, y: 20 });
  });

  it("disables browser touch panning on the handle", () => {
    const handle = createHandle();
    renderHook(() => useMove({ current: handle }));

    expect(handle.style.touchAction).toBe("none");
  });
});

describe("useResize", () => {
  it("starts at the default size for each element type", () => {
    const handle = createHandle();

    expect(
      renderHook(() => useResize({ current: handle }, "image")).result.current,
    ).toEqual({ width: 100, height: 100 });
    expect(
      renderHook(() => useResize({ current: handle }, "textarea")).result
        .current,
    ).toEqual({ width: 320, height: 120 });
  });

  it("grows by the drag offset", () => {
    const handle = createHandle();
    const { result } = renderHook(() =>
      useResize({ current: handle }, "textarea"),
    );

    drag(handle, [0, 0], [50, 30]);

    expect(result.current).toEqual({ width: 370, height: 150 });
  });

  it("never shrinks below 100x50, measuring from the drag start", () => {
    const handle = createHandle();
    const { result } = renderHook(() =>
      useResize({ current: handle }, "textarea"),
    );

    // Overshoot past the minimum, then come back part of the way.
    drag(handle, [0, 0], [-1000, -1000], [-200, -60]);

    expect(result.current).toEqual({ width: 120, height: 60 });
  });
});
