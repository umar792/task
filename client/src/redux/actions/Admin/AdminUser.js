// ----- get all user

import toast from "react-hot-toast";
import { ApiURL } from "../../../setting/GlobleVariable";
import {
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_REQUEST_FAIL,
  ADMIN_ALL_USERS_SUCCESS,
} from "../../constant/User";

export const AdminAllUserFunc = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_USERS_REQUEST });
    const res = await fetch(`${ApiURL}/user/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("instapass_user_token"),
      },
    });
    dispatch({ type: ADMIN_ALL_USERS_REQUEST_FAIL });
    const data = await res.json();
    console.log(data, res.status);
    if (res.status === 500) {
      return toast.error("Internal Server Error");
    }
    if (!data || res.status === 400 || res.status === 403) {
      return toast.error(data.message);
      //   return alert(data.message);
    }
    if (res.status === 200) {
      dispatch({ type: ADMIN_ALL_USERS_SUCCESS, payload: data.users });
    }
  } catch (error) {
    dispatch({ type: ADMIN_ALL_USERS_FAIL });
    toast.error(error.message);
  }
};
