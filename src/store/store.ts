import { combineSlices, configureStore } from "@reduxjs/toolkit";

import textColorSlice from "@/store/textColorSlice";

const rootReducer = combineSlices(textColorSlice);

export type RootState = ReturnType<typeof rootReducer>;

// A factory so each test can start from a fresh store.
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
