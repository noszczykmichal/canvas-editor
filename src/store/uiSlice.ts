import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  textColor: string;
  backgroundImage: string;
  imageBoxBackground: string;
};

const initialState: UiState = {
  textColor: "#353535",
  backgroundImage: "",
  imageBoxBackground: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTextColor: (state, action: PayloadAction<string>) => {
      return { ...state, textColor: action.payload };
    },
    setBackgroundImage: (state, action) => {
      return { ...state, backgroundImage: action.payload };
    },
    setImageBoxBackground: (state, action) => {
      return { ...state, imageBoxBackground: action.payload };
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;
