import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { GetEventsDeatils } from "../redux/actions/Events";
import event from "../assets/event.png";
import Spinner from "../Components/Loading/Spinner";

const TicketDetails = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetEventsDeatils(parseInt(id)));
  }, [id]);
  const EventDetails = useSelector((state) => state.events.EventDetails);

  const arrayis = [];
  EventDetails?.forEach((item, index) => {
    arrayis.push(item.tevo_section_name + "row" + item.row);
  });
  const isLoading = useSelector((state) => state.events.isLoading);

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <h1 className="sm:text-3xl  text-center !text-[40px] font-medium title-font mb-[30px] text-gray-900">
            All Tickets Groups
          </h1>
          {isLoading ? (
            <p>loading</p>
          ) : (
            <div class="flex flex-wrap -m-4 mt-3 gap-[20px] justify-center">
              {EventDetails?.map((item, index) => {
                return (
                  <div
                    class="lg:w-1/5 md:w-1/3 p-4 w-full  hover:shadow-lg border-[1px]"
                    key={index}
                  >
                    <NavLink to={`/tickets/group.details/${item.id}`}>
                      <p class="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          class="object-cover object-center w-full h-full block"
                          src={event}
                        />
                      </p>
                      <div class="mt-4">
                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                          Formate : {item?.format}
                        </h3>
                        <h2 class="text-gray-900 title-font text-lg font-medium">
                          {/* {item?.public_notes} */}
                          {item?.public_notes?.length > 60
                            ? item?.public_notes?.slice(0, 60) + "..."
                            : item?.public_notes}
                        </h2>
                        <p class="mt-1">${item?.retail_price}.00</p>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TicketDetails;
