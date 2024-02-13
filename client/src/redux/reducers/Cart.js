import { createReducer } from "@reduxjs/toolkit";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_TO_CART_FAIL,
  REMOVE_TO_CART_REQUEST,
  REMOVE_TO_CART_SUCCESS,
} from "../constant/Cart";

const initialState = {
  cartLoading: false,
  cartData: [],
};

export const Cart = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_CART_REQUEST, (state) => {
      state.cartLoading = true;
    })
    .addCase(ADD_TO_CART_SUCCESS, (state, action) => {
      state.cartLoading = false;
      state.cartData = [...state.cartData, action.payload];
    })
    .addCase(ADD_TO_CART_FAIL, (state) => {
      state.cartLoading = false;
    })
    // ------ remove
    .addCase(REMOVE_TO_CART_REQUEST, (state) => {
      state.cartLoading = true;
    })
    .addCase(REMOVE_TO_CART_SUCCESS, (state, action) => {
      state.cartLoading = false;
      state.cartData = action.payload;
    })
    .addCase(REMOVE_TO_CART_FAIL, (state) => {
      state.cartLoading = false;
    });
});
