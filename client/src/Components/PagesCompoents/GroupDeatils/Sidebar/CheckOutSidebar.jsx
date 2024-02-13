import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { CreateOrder } from "../../../../redux/actions/Events";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const CheckOutSidebar = ({ SingleTicket, SetSingleTicket }) => {
  const [qty, setqty] = useState(null);
  const dispatch = useDispatch();
  //   ------------- placeorder
  const placeorder = () => {
    if (Object.keys(SingleTicket).length > 0) {
      if (!qty) {
        return toast.error("Plaese select the quantity");
      }
      dispatch(
        CreateOrder(
          SingleTicket && SingleTicket[0]?.id,
          qty,
          SingleTicket && SingleTicket[0]?.retail_price,
          SingleTicket && SingleTicket[0]?.format,
          dispatch
        )
      );
    }
  };

  const isloadingcreateOrder = useSelector((state) => state.events.isLoading);
  useEffect(() => {
    if (
      isloadingcreateOrder === true &&
      SingleTicket &&
      SingleTicket?.length > 0
    ) {
      Loading.standard("Loading Plaese Wait");
    } else {
      Loading.remove();
    }
  }, [isloadingcreateOrder]);
  console.log(isloadingcreateOrder);

  return (
    <div
      className={` absolute top-0 z-10  h-[100vh] w-[100%] !bg-color4 !text-color2 px-2 py-3 checkout_sidebar_inner
      ${
        SingleTicket && SingleTicket?.length > 0
          ? "left-[0%] duration-500"
          : "left-[-150%] duration-500"
      }
    `}
    >
      <MdArrowBackIos
        className="my-3 mx-2 text-[25px] cursor-pointer"
        accordion
        onClick={() => SetSingleTicket([])}
      />
      <div className="flex justify-between place-items-start gap-3 mt-5">
        <div>
          <h2 className="mb-1">
            Section {SingleTicket && SingleTicket[0]?.section} - Row{" "}
            {SingleTicket && SingleTicket[0]?.row}
          </h2>
          <p className="my-2 font-bold">
            ${SingleTicket && SingleTicket[0]?.retail_price}/ea
          </p>
        </div>
        <select
          className="bg-color4 !text-color5 border-[1px] border-color5 px-2 py-1 rounded-md"
          value={qty}
          onChange={(e) => setqty(e.target.value)}
        >
          <option value="" className="">
            Select Ticket
          </option>
          {SingleTicket &&
            SingleTicket[0]?.splits?.map((item, index) => {
              return (
                <option
                  value={item && item}
                  key={index}
                  className="!border-b-[1px] border-b-color5"
                >
                  {item && item}
                </option>
              );
            })}
        </select>
      </div>
      <button
        className="mt-5 w-full bg-color4 text-color2 border-[1px] border-redColor py-2 px-3 rounded-md
       hover:bg-color1 hover:border-color2 hover:text-redColor
      "
        onClick={placeorder}
      >
        Checkout
      </button>
      <div className="my-3">
        <h2 className="mb-1 font-bold ">Delivery notes</h2>
        <p className="text-color5 my-1 text-left">
          Tickets will be transferred to the email address you provide via
          TicketTransferService prior to the event, and we guarantee it. Have
          questions? Contact us at example@gmail.com any time
        </p>
      </div>
    </div>
  );
};

export default CheckOutSidebar;
