import React from "react";
import { useSelector } from "react-redux";
import event from "../../assets/event.png";
import { NavLink } from "react-router-dom";
import "./Section2.css";
import EventCard from "../EventCard/EventCard";
import Loading from "../Loading/Loading";

const Section2 = () => {
  const AllEvents = useSelector((state) =>
    state.events.AllEvents?.slice(0, 12)
  );
  const isloading = useSelector((state) => state.events.isLoading);
  // console.log(AllEvents, "this event");
  return (
    <section className="!bg-color1 !text-color2 body-font">
      {/* <div className="neon"></div>
      <div class="gradient"></div>
      <div class="spotlight"></div> */}
      <div className="px-5 py-5 mx-auto 2xl:px-[100px]">
        <div className="flex flex-col text-center w-full mb-20 ">
          <h2 className="sm:text-3xl md:text-[50px] font-bold  !mb-4  !text-redColor">
            Latest Tickets
          </h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-color5 border-b-[1px] border-b-redColor pb-3">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
            Ticksting system.
          </p>
        </div>

        <div className=" flex flex-wrap  justify-center place-items-center gap-[40px] relative max-w-[1400px] mx-auto">
          {isloading ? (
            <Loading />
          ) : (
            AllEvents &&
            AllEvents?.length > 0 && (
              <div className="w-[100%] h-[350px] bg-redColor  z-[1] !blur-[350px] absolute t left-[0] transform translate[-50%, 0]"></div>
            )
          )}
          {AllEvents?.map((item, index) => {
            return <EventCard item={item} key={index} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Section2;
