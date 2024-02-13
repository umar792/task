import axios from "axios";

import {
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
import { ApiURL } from "../../setting/GlobleVariable";
import toast from "react-hot-toast";

// ----- create user
export const UserSignUp = (formdata, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    // const res = await axios.post(`${ApiURL}/user/registration`, formdata);
    const res = await fetch(`${ApiURL}/user/registration`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: formdata,
    });
    dispatch({ type: USER_SIGNUP_REQUEST_FAIL });
    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      return toast.error(data.message, { duration: 5000 });
    }
    if (res.status === 200) {
      dispatch({ type: USER_SIGNUP_SUCCESS });
      toast.success(data.message, { duration: 3000 });
      navigate("/login");
    }
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL });
  }
};

// ---------------------- user login
export const UserLogin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const res = await fetch(`${ApiURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    dispatch({ type: LOGIN_USER_REQUEST_FAIL });
    const data = await res.json();

    console.log(data);
    if (res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
      localStorage.setItem("instapass_user_token", data.Token);
      navigate("/");
    }
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL });
  }
};

// ----- tokrn verify
export const TokenVerify = () => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_VERIFY_REQUEST });

    const res = await fetch(`${ApiURL}/user/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("instapass_user_token"),
      },
    });
    dispatch({ type: TOKEN_VERIFY_REQUEST_FAIL });
    const data = await res.json();
    if (res.status === 400) {
      return;
    } else {
      dispatch({ type: TOKEN_VERIFY_SUCCESS, payload: data.User });
    }
  } catch (error) {
    dispatch({ type: TOKEN_VERIFY_FAIL });
  }
};

// ---- logout User
export const LogoutUserFunc = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });
  localStorage.removeItem("instapass_user_token");
  dispatch({ type: LOGOUT_USER_SUCCESS });
  toast.success("Successfully logged out", { duration: 3000 });
  navigate("/");
};
