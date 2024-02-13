import { createReducer } from "@reduxjs/toolkit";
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

const initialState = {
  isLoading: false,
  AllEvents: [],
  EventDetails: [],
  CopyofAllEvents: [],
  GroupsEvents: {},
  serachevents: [],
  copyofsearch: [],
  SibgleEventLoading: false,
  AllEventLoading: false,
};

export const EventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_ALL_EVENTS_REQUEST, (state, action) => {
      state.isLoading = true;
      state.AllEventLoading = true;
    })
    .addCase(GET_ALL_EVENTS_SUCCESS, (state, action) => {
      const uniqueEventIds = new Set(state.AllEvents.map((event) => event.id));
      const newEvents = action.payload.filter(
        (event) => !uniqueEventIds.has(event.id)
      );
      state.AllEvents = [...state.AllEvents, ...newEvents];
      state.isLoading = false;
      state.AllEventLoading = false;
    })
    .addCase(GET_ALL_EVENTS_ERROR, (state, action) => {
      state.isLoading = false;
      state.AllEventLoading = false;
    })
    // ========== event details
    .addCase(GET_EVENTS_DEATILS_REQUEST, (state, action) => {
      state.isLoading = true;
    })
    .addCase(GET_EVENTS_DEATILS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.EventDetails = action.payload;
    })
    .addCase(GET_EVENTS_DEATILS_ERROR, (state, action) => {
      state.isLoading = false;
    })
    // --- grou details
    .addCase(GET_EVENTS_GROUP_DEATILS_REQUEST, (state, action) => {
      state.isLoading = true;
      state.SibgleEventLoading = true;
    })
    .addCase(GET_EVENTS_GROUP_DEATILS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.SibgleEventLoading = false;
      state.GroupsEvents = action.payload;
    })
    .addCase(GET_EVENTS_GROUP_DEATILS_ERROR, (state, action) => {
      state.isLoading = false;
      state.SibgleEventLoading = false;
    })
    // ---- CREATE ORDER
    .addCase(CREATE_ORDER_REQUEST, (state, action) => {
      state.isLoading = true;
    })
    .addCase(CREATE_ORDER_SUCCESS, (state, action) => {
      state.isLoading = false;
    })
    .addCase(CREATE_ORDER_ERROR, (state, action) => {
      state.isLoading = false;
    })
    // ----- search events
    .addCase(SEARCH_EVENTS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(SEARCH_EVENTS_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(SEARCH_EVENTS_SUCCESS, (state, action) => {
      state.serachevents = action.payload;
      state.isLoading = false;
    })
    .addCase(SEARCH_EVENTS_ERROR, (state, action) => {
      state.isLoading = false;
    })
    // -------- filter the events
    .addCase(FILTERS_EVENTS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(FILTERS_EVENTS_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(FILTERS_EVENTS_SUCCESS, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.copyofsearch = action.payload.filteredEvents1;
      state.serachevents = action.payload.filteredEvents;
    })
    .addCase(FILTERS_EVENTS_ERROR, (state) => {
      state.isLoading = false;
    })
    // -------- filter the events at event page
    .addCase(ALL_EVENTS_FILTERS_EVENTS_REQUEST, (state) => {
      state.isLoading = true;
    })

    .addCase(ALL_EVENTS_FILTERS_EVENTS_SUCCESS, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.CopyofAllEvents = action.payload.filteredEvents1;
      state.AllEvents = action.payload.filteredEvents;
    })

    // --- cleasr filter
    .addCase("CLEAR_FILTERS", (state, action) => {
      console.log(action.payload);
      state.serachevents = action.payload;
      state.copyofsearch = [];
      state.CopyofAllEvents = [];
    })
    // --------- search by events
    .addCase(CATEGORY_SEARCH_EVENTS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(CATEGORY_SEARCH_EVENTS_REQUEST_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(CATEGORY_SEARCH_EVENTS_SUCCESS, (state, action) => {
      state.serachevents = action.payload;
      state.isLoading = false;
    })
    .addCase(CATEGORY_SEARCH_EVENTS_ERROR, (state, action) => {
      state.isLoading = false;
    });
});
