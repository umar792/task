import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import CheckOutSidebar from "./CheckOutSidebar";
import Spinner from "../../../Loading/Spinner";

const Sidebar = ({ filterevent, filtertheEvent }) => {
  const GroupsEvents = useSelector((state) => state.events.EventDetails);
  const SibgleEventLoading = useSelector(
    (state) => state.events.SibgleEventLoading
  );
  const [SingleTicket, setSingleTicket] = useState([]);
  const clickOnButton = (id) => {
    const filterSingleEvent =
      GroupsEvents && GroupsEvents?.filter((item) => item.id == id);
    setSingleTicket(filterSingleEvent);
  };

  return (
    <div className="!bg-color4  relative">
      {/* --------------------  */}
      <div
        className={` ${
          SingleTicket && SingleTicket?.length > 0
            ? "left-[0%] duration-500"
            : "!left-[-150%] duration-500"
        }  `}
      >
        <CheckOutSidebar
          SingleTicket={SingleTicket}
          SetSingleTicket={setSingleTicket}
        />
      </div>
      {/* --head  */}
      {SingleTicket && SingleTicket?.length === 0 && (
        <div className="deatils_sidebar">
          <div className=" py-2 px-2">
            {/* <img src={logo} alt="" className="my-5" /> */}
            <h2 className="mb-1 text-[23px] text-color2 font-medium evet_namesidebar">
              {/* Insta<span className="text-color2">Pass</span> */}
              {filterevent && filterevent[0]?.name}
            </h2>
            <p className="text-[13px] text-color5">
              TicketPlay is a ticket marketplace that puts fans first. All
              tickets are protected by our <span>Fan Promise</span>.
            </p>
            <p className="text-[13px] text-color2 my-2 font-bold ">
              Occurs_at :{" "}
              <span className="text-color5 mx-1">
                {filterevent && filterevent[0]?.occurs_at_local?.slice(0, 10)} /{" "}
                {filterevent && filterevent[0]?.occurs_at_local?.slice(-4)}
              </span>
            </p>
            <p className="text-[13px] text-color2 my-2 font-bold ">
              Location :{" "}
              <span className="text-color5 mx-1">
                {filterevent && filterevent[0]?.venue?.location} /{" "}
                {filterevent && filterevent[0]?.venue?.name}
              </span>
            </p>
          </div>
          {/* ------  */}
          {SibgleEventLoading ? (
            <div className="w-full flex justify-center place-items-center my-3">
              <Spinner />
            </div>
          ) : (
            <div className=" py-2 px-2 my-2 mb-[90px]">
              <h2 className="text-color5 mb-2 font-medium">ALL TICKETS</h2>
              <div className="border-[1px] border-color5 px-2 py-2 rounded-md ">
                {/* ---- price  */}
                {GroupsEvents &&
                  GroupsEvents?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="py-2 border-b-[1px] border-b-color5 my-2 flex justify-between gap-3 place-items-center cursor-pointer hover:bg-color3 px-1 "
                        onClick={() => clickOnButton(item?.id)}
                      >
                        <h2 className="px-4 py-1 border-[1px] border-color5 rounded-md font-medium text-[18px]">
                          ${item?.retail_price}
                        </h2>
                        <div className="w-full">
                          <h2 className="mb-1 font-bold">
                            Section {item?.section} - Row {item?.row}{" "}
                          </h2>
                          <p className="text-color5">
                            {item?.available_quantity} tickets
                          </p>
                        </div>
                        <IoIosArrowForward className="text-[35px] text-color5" />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
