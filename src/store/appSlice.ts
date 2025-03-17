import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isEditing: boolean;
  onHover: boolean;
};

const initialState: initialStateType = {
  isEditing: false,
  onHover: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeIsEditing(state, actions) {
      state.isEditing = actions.payload;
    },
    onHoverChange(state, actions) {
      state.onHover = actions.payload;
    },
    updateAsset() {},
  },
});

export const { changeIsEditing, onHoverChange } = appSlice.actions;
