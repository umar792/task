import React, { useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterAllEventsatEventPage,
  FilterSearchingEvents,
  clearFilter,
} from "../../../redux/actions/Events";
import { RxCross1 } from "react-icons/rx";
import { updateFiltrationView } from "../../../redux/actions/State";

const SidebarCategory = ({ tickets = false }) => {
  const shearchingevents = useSelector((state) => state.events.serachevents);
  const copyofsearch = useSelector((state) => state.events.copyofsearch);
  const AllEvents = useSelector((state) => state.events.AllEvents);
  const CopyofAllEvents = useSelector((state) => state.events.CopyofAllEvents);
  const data = [
    {
      p1: 0,
      p2: 50,
    },
    {
      p1: 50,
      p2: 100,
    },
    {
      p1: 100,
      p2: 500,
    },
  ];
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [minprice, setminprice] = useState("");
  const [maxprice, setmaxprice] = useState("");
  //
  const dispatch = useDispatch();
  const searchFunc = () => {
    const data = {
      startdate,
      enddate,
      minprice,
      maxprice,
    };
    if (tickets) {
      dispatch(FilterAllEventsatEventPage(data, AllEvents));
      dispatch(updateFiltrationView(false));
    } else {
      dispatch(FilterSearchingEvents(data, shearchingevents));
      dispatch(updateFiltrationView(false));
    }
  };
  return (
    <div className="filtersidebar">
      {/* ---- searc bar  */}
      {/* <div className="search my-2">
        <h2 className=" text-[23px] mb-2 mt-3">Search by name</h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full  py-3 px-2 bg-transparent rounded-md outline-none border-[1px] border-color5 text-color5"
        />
      </div> */}
      {/* ---- search by date  */}
      <div className="">
        <div className="my-5">
          <div className="flex justify-between place-items-center">
            <h2 className="text-[23px] mb-1 mt-3">Search by date</h2>
            <RxCross1
              className="text-[23px] cursor-pointer crosssidebar"
              onClick={() => dispatch(updateFiltrationView(false))}
            />
          </div>
          <div className="my-2 flex justify-between place-items-center gap-[2px]">
            <div className="">
              <p className="text-[14px] mb-1 text-color5">Start Date</p>
              <input
                value={startdate}
                onChange={(e) => setstartdate(e.target.value)}
                type="date"
                placeholder="Start date"
                className="text-color2 dateinput_category px-2 rounded-md w-full bg-transparent  py-2 border-[1px] border-color5 outline-none"
                style={{ color: "white" }}
                id="start"
              />
            </div>
            <div className="">
              <p className="text-[14px] mb-1 text-color5">End Date</p>
              <input
                value={enddate}
                onChange={(e) => setenddate(e.target.value)}
                type="date"
                placeholder="Start date"
                className="text-color2 dateinput_category px-2 rounded-md w-full bg-transparent  py-2 border-[1px] border-color5 outline-none"
                style={{ color: "white" }}
                id="start"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ---- search by price  */}
      <div className="my-5">
        <h2 className=" text-[23px] mb-1 mt-3">Search by price</h2>
        <div className="flex flex-col gap-2 px-2">
          {/* {data?.map((item, index) => {
            return (
              <div
                className="flex justify-start place-items-center gap-3"
                key={index}
              >
                {index === 3 ? (
                  <MdOutlineCheckBox className="text-[23px] bg-transparent" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank className="text-[23px] bg-transparent" />
                )}

                <p className="text-color5 text-[20px] cursor-pointer hover:text-color2">
                  ${item.p1} - ${item.p2}
                </p>
              </div>
            );
          })} */}
          <div className="flex justify-start place-items-center gap-2 mt-2">
            <input
              value={minprice}
              onChange={(e) => setminprice(e.target.value)}
              type="number"
              placeholder="min"
              className="w-[70px]  outline-none p-2 rounded-md bg-transparent border-[1px] border-color5 text-center"
            />
            <input
              value={maxprice}
              onChange={(e) => setmaxprice(e.target.value)}
              type="number"
              placeholder="max"
              className="w-[70px] p-2  outline-none rounded-md bg-transparent border-[1px] border-color5 text-center"
            />
            <button className="px-3 w-full py-2 bg-transparent border-[1px] border-color5 rounded-md cursor-pointer">
              Go
            </button>
          </div>
          <button
            onClick={searchFunc}
            className="px-3 py-2 bg-transparent border-[1px] border-color5 !bg-color1 mt-3 rounded-md cursor-pointer"
          >
            Filter
          </button>
          <button
            onClick={() => {
              tickets
                ? dispatch(clearFilter(CopyofAllEvents))
                : dispatch(clearFilter(copyofsearch));
              dispatch(updateFiltrationView(false));
            }}
            className="px-3 py-2 bg-transparent border-[1px] border-color5 !bg-color1 mt-3 rounded-md cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarCategory;
