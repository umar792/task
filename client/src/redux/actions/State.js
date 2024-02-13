import { FILTRATION_SIDEBAR } from "../constant/State";

export const updateFiltrationView = (value) => async (dispatch) => {
  dispatch({ type: FILTRATION_SIDEBAR, payload: value });
};
