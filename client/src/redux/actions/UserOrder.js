import { ApiURL } from "../../setting/GlobleVariable";
import {
  CREATE_USER_ORDER_FAIL,
  CREATE_USER_ORDER_REQUEST,
  CREATE_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
} from "../constant/UserOrder";

export const CreateUserOrder =
  (
    totalamount,
    type,
    payments,
    service_fee,
    tax,
    id,
    name,
    price,
    qty,
    order_Id
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_USER_ORDER_REQUEST });
      const res = await fetch(`${ApiURL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("instapass_user_token"),
        },
        body: JSON.stringify({
          totalamount,
          type,
          payments,
          service_fee,
          tax,
          id,
          name,
          price,
          qty,
          order_Id
        }),
      });
      const data = await res.json();
      if (res.status === 400) {
        return console.log(data.message);
      } else {
        console.log(data.message);
        dispatch({ type: CREATE_USER_ORDER_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: CREATE_USER_ORDER_FAIL });
    }
  };

// ---- get all user orders
export const UserOrdersFunc = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDER_REQUEST });
    const res = await fetch(`${ApiURL}/order/get/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("instapass_user_token"),
      },
    });
    const data = await res.json();
    if (res.status === 400) {
      return console.log(data);
    } else {
      console.log(data);
      dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data.orders });
    }
  } catch (error) {
    dispatch({ type: GET_USER_ORDER_FAIL });
  }
};
