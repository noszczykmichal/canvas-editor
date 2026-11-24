import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CanvasContextProvider } from "@store/context";
import App from "../../../App";

// TextArea relies on the canvas container ref and the "text" control, so it
// is tested through the whole app.
const setup = async () => {
  const user = userEvent.setup();
  const { container } = render(
    <CanvasContextProvider>
      <App />
    </CanvasContextProvider>,
  );
  const canvas = container.querySelector(".canvas-container") as HTMLElement;
  const addTextButton = screen.getByRole("button", { name: /text/i });

  await user.click(addTextButton);

  const textArea = screen.getByPlaceholderText("Type your text here");
  const wrapper = textArea.closest(".wrapper") as HTMLElement;
  const icon = (name: string) =>
    wrapper.querySelector(`.${name}`) as SVGSVGElement;

  return { user, container, canvas, addTextButton, textArea, wrapper, icon };
};

describe("TextArea", () => {
  it("is added by the text control, which is then disabled", async () => {
    const { addTextButton, textArea } = await setup();

    expect(textArea).toBeInTheDocument();
    expect(addTextButton).toBeDisabled();
  });

  it("accepts typed text", async () => {
    const { user, textArea } = await setup();

    await user.type(textArea, "Hello poster");

    expect(textArea).toHaveValue("Hello poster");
  });

  it("is removed by the trash icon, re-enabling the text control", async () => {
    const { user, addTextButton, textArea, icon } = await setup();

    await user.click(icon("delete-icon"));

    expect(textArea).not.toBeInTheDocument();
    expect(addTextButton).toBeEnabled();
  });

  describe("focus", () => {
    it("starts focused, with icons and the color palette shown", async () => {
      const { textArea, icon } = await setup();

      expect(textArea).toHaveClass("text-area text-area--focused", {
        exact: true,
      });
      expect(icon("move-icon")).toHaveClass("icon--focused");
      expect(screen.getAllByRole("button", { name: /^text #/ })).toHaveLength(
        5,
      );
    });

    it("unfocuses on mousedown elsewhere in the canvas and refocuses on mousedown inside", async () => {
      const { canvas, textArea, icon } = await setup();

      fireEvent.mouseDown(canvas);

      expect(textArea).toHaveClass("text-area", { exact: true });
      expect(icon("move-icon")).toHaveClass("icon");
      expect(
        screen.queryByRole("button", { name: /^text #/ }),
      ).not.toBeInTheDocument();

      fireEvent.mouseDown(textArea);

      expect(textArea).toHaveClass("text-area--focused");
      expect(
        screen.getAllByRole("button", { name: /^text #/ }).length,
      ).toBeGreaterThan(0);
    });

    it("removes its canvas mousedown listener when removed", async () => {
      const { user, canvas, icon } = await setup();
      const removeSpy = vi.spyOn(canvas, "removeEventListener");

      await user.click(icon("delete-icon"));

      expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    });
  });

  describe("color palette", () => {
    it("starts with the default dark color selected", async () => {
      const { textArea } = await setup();

      expect(textArea).toHaveStyle({ color: "#353535" });
      expect(screen.getByRole("button", { name: "text #353535" })).toHaveClass(
        "color__button color__button--focused",
        { exact: true },
      );
    });

    it("changes the text color and the selected swatch", async () => {
      const { user, textArea } = await setup();

      await user.click(screen.getByRole("button", { name: "text #cb0000" }));

      expect(textArea).toHaveStyle({ color: "#cb0000" });
      expect(screen.getByRole("button", { name: "text #cb0000" })).toHaveClass(
        "color__button--focused",
      );
      expect(screen.getByRole("button", { name: "text #353535" })).toHaveClass(
        "color__button",
        { exact: true },
      );
    });
  });

  describe("size", () => {
    it("uses a 32px minimum font size at the default size", async () => {
      const { textArea, wrapper } = await setup();

      expect(wrapper).toHaveStyle({ width: "320px", height: "120px" });
      expect(textArea).toHaveStyle({ fontSize: "32px" });
    });

    it("grows the box and scales the font when resized", async () => {
      const { textArea, wrapper, icon } = await setup();
      const resizeHandle = icon("resize-icon");
      // jsdom doesn't implement pointer capture.
      resizeHandle.setPointerCapture = () => {};

      act(() => {
        fireEvent.pointerDown(resizeHandle, { clientX: 0, clientY: 0 });
        fireEvent.pointerMove(resizeHandle, { clientX: 80, clientY: 180 });
        fireEvent.pointerUp(resizeHandle);
      });

      expect(wrapper).toHaveStyle({ width: "400px", height: "300px" });
      expect(textArea).toHaveStyle({ fontSize: "60px" });
    });

    it("moves when dragged by the move icon", async () => {
      const { wrapper, icon } = await setup();
      const moveHandle = icon("move-icon");
      moveHandle.setPointerCapture = () => {};

      act(() => {
        fireEvent.pointerDown(moveHandle, { clientX: 10, clientY: 10 });
        fireEvent.pointerMove(moveHandle, { clientX: 60, clientY: 40 });
        fireEvent.pointerUp(moveHandle);
      });

      expect(wrapper).toHaveStyle({ transform: "translate(50px, 30px)" });
    });
  });
});
