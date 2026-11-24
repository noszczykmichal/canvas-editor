import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Layout portals Backdrop/Modal into #modals-root, which index.html provides.
beforeEach(() => {
  const modalsRoot = document.createElement("div");
  modalsRoot.id = "modals-root";
  document.body.appendChild(modalsRoot);
});

// Vitest globals are disabled, so RTL can't register auto-cleanup itself.
afterEach(() => {
  cleanup();
  document.getElementById("modals-root")?.remove();
});
