import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CanvasContextProvider } from "@/store/context";
import App from "./App";

describe("App", () => {
  it("renders the controls with export disabled on an empty canvas", () => {
    render(
      <CanvasContextProvider>
        <App />
      </CanvasContextProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Export to PNG" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: /text/i })).toBeEnabled();
  });
});
