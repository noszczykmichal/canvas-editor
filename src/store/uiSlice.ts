import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  textColor: string;
  backgroundImage: string;
  imageBoxBackground: string;
  isTextFieldAdded: boolean;
  isBackdropOpen: boolean;
  isModalOpen: boolean;
};

const initialState: UiState = {
  textColor: "#353535",
  backgroundImage: "",
  imageBoxBackground: "",
  isTextFieldAdded: false,
  isBackdropOpen: false,
  isModalOpen: false,
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
    setIsTextFieldAdded: (state, action: PayloadAction<boolean>) => {
      return { ...state, isTextFieldAdded: action.payload };
    },
    setIsBackdropOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isBackdropOpen: action.payload };
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isModalOpen: action.payload };
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;
