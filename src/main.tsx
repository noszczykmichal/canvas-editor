import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "@/index.scss";
import { makeStore } from "@/store/store";
import { CanvasContextProvider } from "@/store/context";
import App from "@/App";

const store = makeStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CanvasContextProvider>
        <App />
      </CanvasContextProvider>
    </Provider>
  </StrictMode>,
);
