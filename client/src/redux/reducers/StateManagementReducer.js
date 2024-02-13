import { createReducer } from "@reduxjs/toolkit";
import { FILTRATION_SIDEBAR } from "../constant/State";

const initialState = {
  categorySidebar: false,
};

export const StateManagementReducer = createReducer(initialState, (builder) => {
  builder.addCase(FILTRATION_SIDEBAR, (state, action) => {
    state.categorySidebar = action.payload;
  });
});
