import toast from "react-hot-toast";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_TO_CART_FAIL,
  REMOVE_TO_CART_REQUEST,
  REMOVE_TO_CART_SUCCESS,
} from "../constant/Cart";

export const AddtoCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    // here is api call
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    toast.success("Ticket added to cart successfully", { duration: 5000 });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL });
  }
};

// --- remove tickets from cart
export const RemovetoCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_TO_CART_REQUEST });
    // here is api call
    dispatch({ type: REMOVE_TO_CART_SUCCESS, payload: data });
    toast.success("Ticket remove to cart successfully", { duration: 5000 });
  } catch (error) {
    dispatch({ type: REMOVE_TO_CART_FAIL });
  }
};
