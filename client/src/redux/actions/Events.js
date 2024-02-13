import toast from "react-hot-toast";
import { ApiURL } from "../../setting/GlobleVariable";
import {
  ALL_EVENTS_FILTERS_EVENTS_REQUEST,
  ALL_EVENTS_FILTERS_EVENTS_SUCCESS,
  CATEGORY_SEARCH_EVENTS_ERROR,
  CATEGORY_SEARCH_EVENTS_REQUEST,
  CATEGORY_SEARCH_EVENTS_REQUEST_FAIL,
  CATEGORY_SEARCH_EVENTS_SUCCESS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  FILTERS_EVENTS_ERROR,
  FILTERS_EVENTS_REQUEST,
  FILTERS_EVENTS_REQUEST_FAIL,
  FILTERS_EVENTS_SUCCESS,
  GET_ALL_EVENTS_ERROR,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_EVENTS_DEATILS_ERROR,
  GET_EVENTS_DEATILS_REQUEST,
  GET_EVENTS_DEATILS_SUCCESS,
  GET_EVENTS_GROUP_DEATILS_ERROR,
  GET_EVENTS_GROUP_DEATILS_REQUEST,
  GET_EVENTS_GROUP_DEATILS_SUCCESS,
  SEARCH_EVENTS_ERROR,
  SEARCH_EVENTS_REQUEST,
  SEARCH_EVENTS_REQUEST_FAIL,
  SEARCH_EVENTS_SUCCESS,
} from "../constant/Events";
import axios from "axios";
import { CreateUserOrder } from "./UserOrder";

// ------- get all events
export const GetAllEvents = (page) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    const res = await axios.get(`${ApiURL}/transcation/all/${page}`);
    const { data } = res;
    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data.events });
  } catch (error) {
    dispatch({ type: GET_ALL_EVENTS_ERROR });
    console.error(error);
  }
};

// --- GET event details
export const GetEventsDeatils = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EVENTS_DEATILS_REQUEST });
    const res = await axios.get(`${ApiURL}/transcation/details/${id}`);
    const { data } = res;
    dispatch({ type: GET_EVENTS_DEATILS_SUCCESS, payload: data.ticket_groups });
  } catch (error) {
    dispatch({ type: GET_EVENTS_DEATILS_ERROR });
    console.error(error);
  }
};

// ---- get group details
export const GetGroupDeatils = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EVENTS_GROUP_DEATILS_REQUEST });
    const res = await axios.get(`${ApiURL}/transcation/event/details/${id}`);
    const { data } = res;
    if (data.errors) {
      dispatch({
        type: GET_EVENTS_GROUP_DEATILS_SUCCESS,
        payload: {},
      });
    } else {
      dispatch({
        type: GET_EVENTS_GROUP_DEATILS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_EVENTS_GROUP_DEATILS_ERROR });
    console.error(error);
  }
};

// ---- CREATE ORDER
export const CreateOrder =
  (id, qty, price, type, dispatchfunc) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
      const res = await axios.post(`${ApiURL}/transcation/order/create`, {
        id,
        price,
        qty,
        type,
      });
      const { data } = res;
      console.log(data);
      dispatch({ type: CREATE_ORDER_SUCCESS });
      if (data.error) {
        return toast.error(data.error, {
          duration: 7000,
        });
      }
      if (res.status === 200) {
        toast.success("Order place successfully", {
          duration: 5000,
        });
        const totalamount = data?.orders[0]?.total;
        const payments = data?.orders[0]?.payments[0]?.type;
        const service_fee = data?.orders[0]?.service_fee;
        const tax = data?.orders[0]?.tax;
        const name = data?.orders[0]?.items[0]?.ticket_group?.event?.name;
        const order_Id = data?.orders[0]?.id;
        // const dispatchfunc = useDispatch();
        dispatchfunc(
          CreateUserOrder(
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
          )
        );
      }
    } catch (error) {
      dispatch({ type: CREATE_ORDER_ERROR });
      console.error(error);
    }
  };

// -- multipul order create
export const CreateOrderMultiple =
  (cartdata, cart = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
      console.log(cartdata);
      const res = await axios.post(
        `${ApiURL}/transcation/order/create/multiple`,
        {
          cartdata,
        }
      );
      var { data } = res;
      console.log(data);
      dispatch({ type: CREATE_ORDER_SUCCESS });
      if (data.error) {
        return toast.error(data.error, {
          duration: 7000,
        });
      } else {
        toast.success("Order place successfully", {
          duration: 5000,
        });
        console.log("hi");
        const totalamount = data?.orders[0]?.total;
        const payments = data?.orders[0]?.payments[0]?.type;
        const service_fee = data?.orders[0]?.service_fee;
        const tax = data?.orders[0]?.tax;
        const name = data?.orders[0]?.items[0]?.ticket_group?.event?.name;
        const order_Id = data?.orders[0]?.id;
        console.log(totalamount, payments, service_fee, tax, name, order_Id);
      }
    } catch (error) {
      dispatch({ type: CREATE_ORDER_ERROR });
      console.error(error);
    }
  };

// ---- search events
export const SearchEvents = (name) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_EVENTS_REQUEST });
    const res = await axios.get(`${ApiURL}/transcation/event/search/${name}`);
    dispatch({ type: SEARCH_EVENTS_REQUEST_FAIL });
    const { data } = res;
    // console.log(data, "====> this is data of serach");
    dispatch({ type: SEARCH_EVENTS_SUCCESS, payload: data.events });
  } catch (error) {
    dispatch({ type: SEARCH_EVENTS_ERROR });
    console.error(error);
  }
};

// ----- filter the searchingevents
export const FilterSearchingEvents = (data, serachdata) => async (dispatch) => {
  try {
    dispatch({ type: FILTERS_EVENTS_REQUEST });

    // Apply filters to the events
    const filteredEvents = serachdata.filter((event) => {
      // Filter by startdate and enddate
      const eventStartDate = new Date(event.occurs_at?.slice(0, 10));
      const eventEndDate = new Date(event.occurs_at?.slice(0, 10));
      const startDateFilter = data.startdate
        ? eventStartDate >= new Date(data.startdate)
        : true;
      const endDateFilter = data.enddate
        ? eventEndDate <= new Date(data.enddate)
        : true;

      if (!startDateFilter || !endDateFilter) {
        return false;
      }

      // Filter by minprice and maxprice
      // const eventPrice = /* You need to get the price of the event from your data */
      // if (
      //   (data.minprice && eventPrice < parseInt(data.minprice)) ||
      //   (data.maxprice && eventPrice > parseInt(data.maxprice))
      // ) {
      //   return false;
      // }

      // Include the entire event data in the results
      return true;
    });
    dispatch({
      type: FILTERS_EVENTS_SUCCESS,
      payload: {
        filteredEvents: filteredEvents,
        filteredEvents1: serachdata,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: FILTERS_EVENTS_ERROR });
  }
};

// ---- fillter all events on event page
export const FilterAllEventsatEventPage =
  (data, serachdata) => async (dispatch) => {
    try {
      dispatch({ type: ALL_EVENTS_FILTERS_EVENTS_REQUEST });

      // Apply filters to the events
      const filteredEvents = serachdata.filter((event) => {
        // Filter by startdate and enddate
        const eventStartDate = new Date(event.occurs_at?.slice(0, 10));
        const eventEndDate = new Date(event.occurs_at?.slice(0, 10));
        const startDateFilter = data.startdate
          ? eventStartDate >= new Date(data.startdate)
          : true;
        const endDateFilter = data.enddate
          ? eventEndDate <= new Date(data.enddate)
          : true;

        if (!startDateFilter || !endDateFilter) {
          return false;
        }

        // Filter by minprice and maxprice
        // if (
        //   (data.minprice && event?. < parseInt(data.minprice)) ||
        //   (data.maxprice && event?. > parseInt(data.maxprice))
        // ) {
        //   return false;
        // }

        // Include the entire event data in the results
        return true;
      });
      dispatch({
        type: ALL_EVENTS_FILTERS_EVENTS_SUCCESS,
        payload: {
          filteredEvents: filteredEvents,
          filteredEvents1: serachdata,
        },
      });
    } catch (error) {
      console.error(error);
      // dispatch({ type: FILTERS_EVENTS_ERROR });
    }
  };

export const clearFilter = (data) => async (dispatch) => {
  dispatch({ type: "CLEAR_FILTERS", payload: data });
};

// ---- search events by category
export const SearchEventsByCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_SEARCH_EVENTS_REQUEST });
    const res = await axios.get(`${ApiURL}/transcation/event/category/${id}`);
    dispatch({ type: CATEGORY_SEARCH_EVENTS_REQUEST_FAIL });
    const { data } = res;
    // console.log(data, "====> this is data of serach");
    dispatch({ type: CATEGORY_SEARCH_EVENTS_SUCCESS, payload: data.events });
  } catch (error) {
    dispatch({ type: CATEGORY_SEARCH_EVENTS_ERROR });
    console.error(error);
  }
};
