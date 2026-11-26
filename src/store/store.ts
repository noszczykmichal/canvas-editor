import { combineSlices, configureStore } from "@reduxjs/toolkit";

import uiSlice from "@/store/uiSlice";

const rootReducer = combineSlices(uiSlice);

export type RootState = ReturnType<typeof rootReducer>;

// A factory so each test can start from a fresh store.
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
