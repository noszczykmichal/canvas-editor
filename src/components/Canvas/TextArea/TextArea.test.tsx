import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CanvasContextProvider } from "@/store/context";
import App from "@/App";

// Swatches live in a "Text color" group and are named by color, e.g. "black".
const queryPalette = () => screen.queryByRole("group", { name: "Text color" });
const swatch = (name: string) =>
  within(screen.getByRole("group", { name: "Text color" })).getByRole(
    "button",
    { name },
  );

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
  const addTextButton = screen.getByRole("button", { name: "text" });

  await user.click(addTextButton);

  const textArea = screen.getByRole("textbox");
  const wrapper = textArea.closest(".wrapper") as HTMLElement;
  const deleteButton = screen.getByRole("button", { name: "Delete text box" });
  const moveButton = screen.getByRole("button", { name: "Move text box" });
  const resizeButton = screen.getByRole("button", { name: "Resize text box" });

  return {
    user,
    canvas,
    addTextButton,
    textArea,
    wrapper,
    deleteButton,
    moveButton,
    resizeButton,
  };
};

// Controls are hidden via the .action-button class (SCSS isn't loaded in
// jsdom, so visibility is checked through the class).
const expectControlsShown = (...buttons: HTMLElement[]) => {
  buttons.forEach((button) =>
    expect(button).toHaveClass("action-button--focused"),
  );
  expect(within(queryPalette()!).getAllByRole("button")).toHaveLength(5);
};

const expectControlsHidden = (...buttons: HTMLElement[]) => {
  buttons.forEach((button) => {
    expect(button).toHaveClass("action-button");
    expect(button).not.toHaveClass("action-button--focused");
  });
  expect(queryPalette()).not.toBeInTheDocument();
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

  it("is removed by the delete button, re-enabling the text control", async () => {
    const { user, addTextButton, textArea, deleteButton } = await setup();

    await user.click(deleteButton);

    expect(textArea).not.toBeInTheDocument();
    expect(addTextButton).toBeEnabled();
  });

  it("labels its action buttons and hides the icons from screen readers", async () => {
    const { deleteButton, moveButton, resizeButton } = await setup();

    [deleteButton, moveButton, resizeButton].forEach((button) => {
      expect(button).toHaveAttribute("type", "button");
      expect(button.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });

  describe("focus", () => {
    it("starts focused, with its controls shown", async () => {
      const { textArea, deleteButton, moveButton, resizeButton } =
        await setup();

      expect(textArea).toHaveClass("text-area text-area--focused", {
        exact: true,
      });
      expectControlsShown(deleteButton, moveButton, resizeButton);
    });

    it("unfocuses on mousedown elsewhere in the canvas and refocuses on mousedown inside", async () => {
      const { canvas, textArea, deleteButton, moveButton } = await setup();

      fireEvent.mouseDown(canvas);

      expect(textArea).toHaveClass("text-area", { exact: true });
      expectControlsHidden(deleteButton, moveButton);

      fireEvent.mouseDown(textArea);

      expect(textArea).toHaveClass("text-area--focused");
      expectControlsShown(deleteButton, moveButton);
    });

    it("shows its controls when the text field gets keyboard focus", async () => {
      const { canvas, textArea, deleteButton, moveButton, resizeButton } =
        await setup();
      fireEvent.mouseDown(canvas);
      expectControlsHidden(deleteButton, moveButton, resizeButton);

      // Focus without any mousedown, as when tabbing in.
      act(() => {
        textArea.focus();
      });

      expectControlsShown(deleteButton, moveButton, resizeButton);
    });

    it("keeps its controls while Tab moves from the text field to its buttons", async () => {
      const { user, textArea, deleteButton, moveButton, resizeButton } =
        await setup();
      act(() => {
        textArea.focus();
      });

      await user.tab();
      expect(deleteButton).toHaveFocus();
      await user.tab();
      expect(moveButton).toHaveFocus();
      await user.tab();
      expect(resizeButton).toHaveFocus();

      expectControlsShown(deleteButton, moveButton, resizeButton);
    });

    it("hides its controls when focus moves outside the text box", async () => {
      const { textArea, addTextButton, deleteButton, moveButton } =
        await setup();
      const outside = screen.getByRole("button", { name: "image" });
      act(() => {
        textArea.focus();
      });

      act(() => {
        outside.focus();
      });

      expect(addTextButton).toBeDisabled();
      expectControlsHidden(deleteButton, moveButton);
    });

    it("keeps its controls when focus goes nowhere (e.g. Safari button click)", async () => {
      const { textArea, deleteButton, moveButton } = await setup();

      fireEvent.focusOut(textArea, { relatedTarget: null });

      expectControlsShown(deleteButton, moveButton);
    });

    it("removes its canvas mousedown listener when removed", async () => {
      const { user, canvas, deleteButton } = await setup();
      const removeSpy = vi.spyOn(canvas, "removeEventListener");

      await user.click(deleteButton);

      expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    });
  });

  describe("color palette", () => {
    it("starts with the default dark color selected", async () => {
      const { textArea } = await setup();

      expect(textArea).toHaveStyle({ color: "#353535" });
      expect(swatch("black")).toHaveAttribute("aria-pressed", "true");
    });

    it("is a labelled group of swatches named by color", async () => {
      await setup();

      const names = within(queryPalette()!)
        .getAllByRole("button")
        .map((button) => button.getAttribute("aria-label"));

      expect(names).toEqual(["black", "white", "red", "blue", "green"]);
    });

    it("changes the text color and the selected swatch", async () => {
      const { user, textArea } = await setup();

      await user.click(swatch("red"));

      expect(textArea).toHaveStyle({ color: "#cb0000" });
      expect(swatch("red")).toHaveAttribute("aria-pressed", "true");
      expect(swatch("black")).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("size", () => {
    it("uses a 32px minimum font size at the default size", async () => {
      const { textArea, wrapper } = await setup();

      expect(wrapper).toHaveStyle({ width: "320px", height: "120px" });
      expect(textArea).toHaveStyle({ fontSize: "32px" });
    });

    it("grows the box and scales the font when resized", async () => {
      const { textArea, wrapper, resizeButton } = await setup();
      // jsdom doesn't implement pointer capture.
      resizeButton.setPointerCapture = () => {};

      act(() => {
        fireEvent.pointerDown(resizeButton, { clientX: 0, clientY: 0 });
        fireEvent.pointerMove(resizeButton, { clientX: 80, clientY: 180 });
        fireEvent.pointerUp(resizeButton);
      });

      expect(wrapper).toHaveStyle({ width: "400px", height: "300px" });
      expect(textArea).toHaveStyle({ fontSize: "60px" });
    });

    it("moves when dragged by the move button", async () => {
      const { wrapper, moveButton } = await setup();
      moveButton.setPointerCapture = () => {};

      act(() => {
        fireEvent.pointerDown(moveButton, { clientX: 10, clientY: 10 });
        fireEvent.pointerMove(moveButton, { clientX: 60, clientY: 40 });
        fireEvent.pointerUp(moveButton);
      });

      expect(wrapper).toHaveStyle({ transform: "translate(50px, 30px)" });
    });
  });
});
