import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { CanvasContextProvider } from "@/store/context";
import { makeStore } from "@/store/store";
import App from "@/App";

// Adding an image goes through the native file picker, so the store starts
// with one already loaded. Rendered through App because ImageBox hands focus
// to the "image" control in the sidebar.
const setup = () => {
  const user = userEvent.setup();
  const { container } = render(
    <Provider
      store={makeStore({
        ui: {
          textColor: "#353535",
          backgroundImage: "",
          imageBoxBackground: "data:image/png;base64,AAAA",
          isTextFieldAdded: false,
          isBackdropOpen: false,
          isModalOpen: false,
        },
      })}
    >
      <CanvasContextProvider>
        <App />
      </CanvasContextProvider>
    </Provider>,
  );

  return {
    user,
    canvas: container.querySelector(".canvas-container") as HTMLElement,
    addImageButton: screen.getByRole("button", { name: "image" }),
    deleteButton: screen.getByRole("button", { name: /delete image/i }),
  };
};

describe("ImageBox", () => {
  it("disables the image control while an image is on the canvas", () => {
    const { addImageButton } = setup();

    expect(addImageButton).toBeDisabled();
  });

  it("is removed by the delete button and moves focus to the image control", async () => {
    const { user, addImageButton, deleteButton } = setup();

    await user.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(addImageButton).toBeEnabled();
    expect(addImageButton).toHaveFocus();
  });

  // jsdom doesn't load SCSS, so this covers the selection logic only. The
  // buttons must also stay focusable in CSS (no display: none) while hidden.
  it("is selected again when Tab reaches it after being deselected", async () => {
    const { user, canvas, deleteButton } = setup();

    await user.pointer({ keys: "[MouseLeft]", target: canvas });
    expect(deleteButton).not.toHaveClass("action-button--selected");

    for (let i = 0; i < 20 && document.activeElement !== deleteButton; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await user.tab();
    }

    expect(deleteButton).toHaveFocus();
    expect(deleteButton).toHaveClass("action-button--selected");
  });
});
