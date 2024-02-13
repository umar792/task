import { createReducer } from "@reduxjs/toolkit";
import {
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_REQUEST_FAIL,
  ADMIN_ALL_USERS_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_REQUEST_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  TOKEN_VERIFY_FAIL,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_REQUEST_FAIL,
  TOKEN_VERIFY_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_REQUEST_FAIL,
  USER_SIGNUP_SUCCESS,
} from "../constant/User";

const initialState = {
  isAuthantication: false,
  adminloading: false,
  isLoading: false,
  user: {},
  AdminAllUser: [],
};

export const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(USER_SIGNUP_REQUEST, (state, action) => {
      state.isLoading = true;
    })
    .addCase(USER_SIGNUP_REQUEST_FAIL, (state, action) => {
      state.isLoading = false;
    })
    .addCase(USER_SIGNUP_SUCCESS, (state, action) => {
      state.isLoading = false;
    })
    .addCase(USER_SIGNUP_FAIL, (state, action) => {
      state.isLoading = false;
    })
    // --- login user
    .addCase(LOGIN_USER_REQUEST, (state, action) => {
      state.isLoading = true;
      state.isAuthantication = false;
    })
    .addCase(LOGIN_USER_REQUEST_FAIL, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = false;
    })
    .addCase(LOGIN_USER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = true;
      state.user = action.payload;
    })
    .addCase(LOGIN_USER_FAIL, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = false;
    })
    // --- verify token
    .addCase(TOKEN_VERIFY_REQUEST, (state, action) => {
      state.isLoading = true;
      state.isAuthantication = false;
    })
    .addCase(TOKEN_VERIFY_REQUEST_FAIL, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = false;
    })
    .addCase(TOKEN_VERIFY_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = true;
      state.user = action.payload;
    })
    .addCase(TOKEN_VERIFY_FAIL, (state, action) => {
      state.isLoading = false;
      state.isAuthantication = false;
    })
    // --- logout  the user
    .addCase(LOGOUT_USER_REQUEST, (state, action) => {
      state.isLoading = true;
      state.isAuthantication = true;
    })
    .addCase(LOGOUT_USER_SUCCESS, (state) => {
      state.isLoading = false;
      state.isAuthantication = false;
      state.user = {};
    })
    // ----- Admin All Users
    .addCase(ADMIN_ALL_USERS_REQUEST, (state) => {
      state.adminloading = true;
    })
    .addCase(ADMIN_ALL_USERS_REQUEST_FAIL, (state, action) => {
      state.adminloading = false;
    })
    .addCase(ADMIN_ALL_USERS_SUCCESS, (state, action) => {
      state.adminloading = false;
      state.AdminAllUser = action.payload;
    })
    .addCase(ADMIN_ALL_USERS_FAIL, (state, action) => {
      state.adminloading = false;
    });
});
