import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TextColorState = { value: string };

const initialState: TextColorState = { value: "#353535" };

const textColorSlice = createSlice({
  name: "textColor",
  initialState,
  reducers: {
    setTextColor: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  selectors: {
    selectTextColor: (state) => state.value,
  },
});

export const { setTextColor } = textColorSlice.actions;
export const { selectTextColor } = textColorSlice.selectors;
export default textColorSlice;
