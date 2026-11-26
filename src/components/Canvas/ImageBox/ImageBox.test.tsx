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
  render(
    <Provider
      store={makeStore({
        ui: {
          textColor: "#353535",
          backgroundImage: "",
          imageBoxBackground: "data:image/png;base64,AAAA",
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
});
