import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { CanvasContextProvider } from "./store/context.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CanvasContextProvider>
      <App />
    </CanvasContextProvider>
  </StrictMode>
);
