import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import event from "../assets/event.png";
import { NavLink } from "react-router-dom";
import { GetAllEvents } from "../redux/actions/Events";
import Spinner from "../Components/Loading/Spinner";
import { useInView } from "react-intersection-observer";
import TicketHeader from "../Components/PagesCompoents/TicketsPage/TicketHeader";
import EventCard from "../Components/EventCard/EventCard";
import "../Components/PagesCompoents/TicketsPage/style/Tickets.css";
import Loading from "../Components/Loading/Loading";
import SidebarCategory from "../Components/PagesCompoents/Categories/SidebarCategory";
import { updateFiltrationView } from "../redux/actions/State";

const Tickets = () => {
  const [ref, inView] = useInView({
    threshold: true, // Check if 90% of the element is in view
  });

  const [page, setpage] = useState(0);

  // ...
  const AllEvents = useSelector((state) => state.events.AllEvents);
  const CopyofAllEvents = useSelector((state) => state.events.CopyofAllEvents);
  const [alleventsState, setAllEventsState] = useState([]);
  const [value, setValue] = useState("Any Dates");
  useEffect(() => {
    setAllEventsState(AllEvents);
  }, [AllEvents]);

  useEffect(() => {
    if (inView) {
      setpage(page + 1);
    }
  }, [inView]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (page === 0) {
      const newp = 1;
      dispatch(GetAllEvents(newp));
    } else {
      dispatch(GetAllEvents(page));
    }
  }, [page]);
  const isLoading = useSelector((state) => state.events.isLoading);
  const active = useSelector((state) => state.statemanagemnt.categorySidebar);
  // console.log(AllEvents);

  const filteredEvents = AllEvents?.filter((event) => {
    // Filter by date ranges
    // setAllEventsState(AllEvents);
    const eventDate = new Date(event.occurs_at);
    const today = new Date();

    switch (value) {
      case "This Weekend":
        const nextSaturday = new Date(today);
        nextSaturday.setDate(
          today.getDate() + ((6 - today.getDay() + 7) % 7) + 1
        ); // Find the next Saturday
        const thisWeekend = today <= eventDate && eventDate <= nextSaturday;
        return thisWeekend;
      case "This Week":
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 6 - today.getDay());
        const thisWeek = today <= eventDate && eventDate <= endOfWeek;
        return thisWeek;
      case "This Month":
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        const thisMonth = today <= eventDate && eventDate <= endOfMonth;
        return thisMonth;
      case "Next Month":
        const startOfNextMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );
        const endOfNextMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 2,
          0
        );
        const nextMonth =
          startOfNextMonth <= eventDate && eventDate <= endOfNextMonth;
        return nextMonth;
      case "Next 60 Days":
        const next60Days =
          today <= eventDate &&
          eventDate <= new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
        return next60Days;
      default:
        return true;
    }
  });

  useEffect(() => {
    setAllEventsState(filteredEvents);
  }, [value]);

  return (
    <section class="!bg-color1 px-[100px] !text-color2 body-font !z-10 ticket_page">
      {/* <TicketHeader setValue={setValue} value={value} /> */}
      <h2 className="xl:ml-24 mx-5 text-[25px] font-bold">
        Events <span className="text-redColor">({alleventsState?.length})</span>
      </h2>
      <button
        className={`filter_btn bg-color4 px-5 py-2 rounded-md cursor-pointer`}
        onClick={() => dispatch(updateFiltrationView(true))}
      >
        Apply Filtration
      </button>
      <div class="container px-0 py-4 mx-auto">
        {/* ===========  */}
        <div className="ticketsGroup">
          {/* <div
            className={`${
              active
                ? "categorySidebarMobile categorysidebar"
                : "categorysidebar"
            } w-full !bg-color3 min-w-[370px] h-[90vh] rounded-t-[8px] overflow-hidden px-2`}
          >
            <SidebarCategory tickets={true} />
          </div> */}
          <div class="flex flex-wrap -m-4 mt-3 gap-[20px] justify-center mb-5  ">
            {alleventsState && alleventsState?.length > 0
              ? alleventsState?.map((item, index) => {
                  return <EventCard item={item} key={index} index={index} />;
                })
              : value !== "Any Dates" && (
                  <p className="w-[80%] h-[60px] text-center rounded-md mt-3 py-3 px-3 bg-color4 text-[23px] text-color2">
                    No Event Found At{" "}
                    <span className="text-redColor font-bold mx-2">
                      {value}
                    </span>
                  </p>
                )}
          </div>
        </div>
        {/* )} */}
        {CopyofAllEvents &&
          CopyofAllEvents?.length === 0 &&
          value === "Any Dates" &&
          AllEvents &&
          AllEvents?.length - 1 && <div ref={ref}></div>}

        {isLoading && (
          // <div
          //   className="w-full flex justify-center place-items-center"
          //   style={{ padding: "20px" }}
          // >
          //   <div
          //     className="inline-block h-8 w-8  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          //     role="status"
          //   >
          //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          //       Loading...
          //     </span>
          //   </div>
          // </div>
          <div className="w-full flex justify-center place-items-center">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Tickets;
