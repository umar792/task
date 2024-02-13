import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./styles/Index.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarCategory from "./SidebarCategory";
import EventCard from "../../EventCard/EventCard";
import { useParams } from "react-router-dom";
import {
  SearchEvents,
  SearchEventsByCategory,
} from "../../../redux/actions/Events";
import Loading from "../../Loading/Loading";
import { updateFiltrationView } from "../../../redux/actions/State";

const Index = () => {
  const serachevents = useSelector((state) => state.events.serachevents);
  const isLoading = useSelector((state) => state.events.isLoading);
  const active = useSelector((state) => state.statemanagemnt.categorySidebar);
  const params = useParams();
  const { name } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (name?.slice(0, 8) == "category") {
      // console.log("working");
      dispatch(SearchEventsByCategory(name?.slice(-2)));
    } else {
      dispatch(SearchEvents(name));
    }
  }, [name]);

  return (
    <div className=" ticketcategory_index max-w-[2000px] mx-auto px-[100px] py-[20px] min-h-[100vh] !bg-color1 !text-color2 w-full">
      <Header />
      <h2 className="my-3 text-[30px] underline nameforsearch">
        Search for :{" "}
        <span className="text-[33px] text-redColor font-bold">
          {name?.slice(0, 8) == "category" ? name?.slice(0, 8) : name}(
          {serachevents && serachevents?.length})
        </span>
      </h2>
      <button
        className={`filter_btn bg-color4 px-5 py-2 my-3 rounded-md cursor-pointer`}
        onClick={() => dispatch(updateFiltrationView(true))}
      >
        Apply Filtration
      </button>
      {/* ========== main page  */}
      <div className="w-full my-[40px] min-h-[90vh] index_category_section_under_header">
        {/* ----- sidebar  */}
        <div
          className={`${
            active ? "categorySidebarMobile categorysidebar" : "categorysidebar"
          } w-full !bg-color3 min-w-[370px] h-[90vh] rounded-t-[8px] overflow-hidden px-2`}
        >
          <SidebarCategory />
        </div>
        {/* ------ content  */}
        {isLoading ? (
          <div className="w-full flex justify-center place-items-start">
            <Loading />
          </div>
        ) : (
          <div className="w-full  bg-black flex justify-center place-items-start gap-5 flex-wrap">
            {serachevents && serachevents?.length > 0 ? (
              serachevents?.map((item, index) => {
                return <EventCard item={item} key={index} index={index} />;
              })
            ) : (
              <p className="w-full text-center rounded-md mt-3 py-3 px-3 bg-color4 text-[23px] text-color2">
                No Event Found At{" "}
                <span className="text-redColor font-bold mx-2">
                  {name?.slice(0, 8) == "category" ? name?.slice(0, 8) : name}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
