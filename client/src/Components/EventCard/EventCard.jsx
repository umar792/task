import React from "react";
import { NavLink } from "react-router-dom";
import defaultlogo from "../../assets/e-ticketing.jpg";
import "../PagesCompoents/TicketsPage/style/Tickets.css";

const EventCard = ({ item, index }) => {
  return (
    <NavLink
      to={`/tickets/group.details/${item?.id}`}
      className="card_image w-[300px] h-[370px] pt-[50px] overflow-hidden relative z-[21] !bg-color1 !text-color2   rounded-lg hover:shadow-md border-[1px] border-color4 "
    >
      <img
        className="rounded-t-lg w-full  object-contain z-[2] duration-200"
        // src="https://wallpapercave.com/wp/wp7488275.jpg"
        src={defaultlogo}
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.2)] z-[1]"></div>

      <div
        className="card_content py-3 px-4 absolute z-[10] bottom-[0] duration-200 left-[0] bg-color3 *:
                w-[100%] h-[150px]
                "
      >
        <h5 className=" mb-2 text-xl font-bold tracking-tight  dark:text-white z-[10] ">
          {item?.name && item?.name?.length > 40
            ? `${item?.name?.slice(0, 40)}...`
            : item?.name}
          .
        </h5>
        <p className="mb-3 font-normal text-color5">
          Occurs_at : {item?.occurs_at?.slice(0, 10)} /{" "}
          {item?.occurs_at_local?.slice(-5)}
        </p>
        <p className="mb-3 font-normal text-color5">
          Location : {item?.venue?.location}
        </p>
      </div>
    </NavLink>
  );
};

export default EventCard;
