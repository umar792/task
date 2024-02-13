import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_USER_ORDER_FAIL,
  CREATE_USER_ORDER_REQUEST,
  CREATE_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
} from "../constant/UserOrder";

const initailState = {
  isloading: false,
  UserOrders: [],
};

export const UserOrders = createReducer(initailState, (builder) => {
  builder
    .addCase(CREATE_USER_ORDER_REQUEST, (state) => {
      state.isloading = true;
    })
    .addCase(CREATE_USER_ORDER_SUCCESS, (state) => {
      state.isloading = false;
    })
    .addCase(CREATE_USER_ORDER_FAIL, (state) => {
      state.isloading = false;
    })
    // ---- get user all orders
    .addCase(GET_USER_ORDER_REQUEST, (state) => {
      state.isloading = true;
    })
    .addCase(GET_USER_ORDER_SUCCESS, (state, action) => {
      state.isloading = false;
      state.UserOrders = action.payload;
    })
    .addCase(GET_USER_ORDER_FAIL, (state) => {
      state.isloading = false;
    });
});
