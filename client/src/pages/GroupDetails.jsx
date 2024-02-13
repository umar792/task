import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CreateOrder,
  GetAllEvents,
  GetEventsDeatils,
  GetGroupDeatils,
} from "../redux/actions/Events";
import Spinner from "../Components/Loading/Spinner";
import { AddtoCart } from "../redux/actions/Cart";
import toast from "react-hot-toast";
import { CreateUserOrder } from "../redux/actions/UserOrder";
import Index from "../Components/PagesCompoents/GroupDeatils/Index";

const GroupDetails = () => {
  const [section, setSection] = useState("");
  const [row, setrow] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [price, setprice] = useState("");
  const [cart, setCart] = useState([]);
  const params = useParams();
  const [qty, setQTY] = useState(null);

  const { id } = params;
  const dispatch = useDispatch();
  const AllEvents = useSelector((state) => state.events.AllEvents);
  useEffect(() => {
    dispatch(GetEventsDeatils(parseInt(id)));
    // if (AllEvents && AllEvents?.length === 0) {
    // }
  }, [id]);
  const GroupsEvents = useSelector((state) => state.events.EventDetails);

  //   ------- select the section which are not duplicate
  const NotDuplicate = [];
  GroupsEvents?.forEach((item) => {
    if (NotDuplicate.includes(item.tevo_section_name)) {
      return;
    } else {
      NotDuplicate.push(item.tevo_section_name);
    }
  });
  const [SelectedRowArray, setSelectedRowArray] = useState([]);
  useEffect(() => {
    const filterArray = GroupsEvents?.filter(
      (item) => item.tevo_section_name == section
    );
    setSelectedRowArray(filterArray);
  }, [section]);
  //   -------- now get selected object
  useEffect(() => {
    dispatch(GetGroupDeatils(groupId));
  }, [row, groupId]);

  const GroupObj = useSelector((state) => state.events.GroupsEvents);
  const isLoading = useSelector((state) => state.events.isLoading);
  //   ========= increment and decriment func
  const increment = () => {
    if (Object.keys(GroupObj).length > 0) {
      if (qty < GroupObj?.available_quantity) {
        setQTY(qty + 1);
      } else {
        setQTY(GroupObj?.available_quantity);
      }
    }
  };
  const decriment = () => {
    if (Object.keys(GroupObj).length > 0) {
      if (qty == 1) {
        setQTY(1);
      } else {
        setQTY(qty - 1);
      }
    }
  };

  // -----  add to card
  const cartData = useSelector((state) => state.cart.cartData);
  const addtocart = () => {
    const isExist = cartData?.filter((item) => item.id === GroupObj.id);
    // const isExistqty = cartData?.filter((item) => item.qty === qty);
    // console.log(qty);
    // console.log(isExistqty);
    // console.log(GroupObj.splits);
    if (isExist?.length > 0) {
      return toast.error(`Ticket already exists in cart`, { duration: 5000 });
    }
    if (!row) {
      return toast.error("Plaese select the row");
    }
    if (row) {
      dispatch(
        AddtoCart({
          name: GroupObj?.event?.name,
          id: GroupObj?.id,
          retail_price: GroupObj?.retail_price,
          qty: qty,
          type: GroupObj?.format,
        })
      );
    }
  };

  useEffect(() => {
    // Get the element by its ID
    var myElement = document.getElementById("map");

    // Hide the element by setting its display property to "none"
    if (isLoading) {
      if (myElement) {
        return myElement.style.setProperty("display", "none", "important");
      }
    } else {
      if (myElement) {
        myElement.style.setProperty("display", "block", "important");
      }
    }

    // Clean up function (optional)
    return () => {
      // You can do cleanup here if needed
    };
  }, [isLoading]);

  return (
    <div>
      <Index id={id} />
    </div>
  );
};

export default GroupDetails;

// ========================================
{
  /* <div class="!bg-color1 !text-color2 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
<div class="flex justify-center items-center lg:flex-row flex-col gap-8">
  <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
    <div class="w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
      <img
        src="https://i.pinimg.com/originals/47/f0/c4/47f0c4a2b23b66e6ec3ba9fda69dcd5f.jpg"
        alt="Wooden Chair Previw"
      />
    </div>
  </div>
  {GroupsEvents?.length > 0 ? (
    <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
      <p class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 !text-color5">
        Type /{" "}
        {GroupsEvents?.length > 0 && GroupsEvents[0]?.eticket == true
          ? "Eticket"
          : "Eticket"}{" "}
        / Format / {GroupsEvents?.length > 0 && GroupsEvents[0]?.format}
      </p>
      <div className="flex justify-between place-items-center gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h2 class="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 dark:text-white mt-4">
              {Object.keys(GroupObj).length > 0 && GroupObj
                ? GroupObj?.event?.name
                : "Please select the section and row"}
            </h2>
            <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6  dark:text-white">
              {Object.keys(GroupObj).length > 0 && GroupObj
                ? `$${GroupObj?.retail_price}`
                : null}
            </p>
          </>
        )}
      </div>

      <div class="lg:mt-11 mt-10">
        <div class="flex flex-row justify-between items-center mt-4">
          <p class="font-medium text-base leading-4 text-gray-600  text-[22px] mb-2">
            Details
          </p>
        </div>
        <div className="flex justify-between place-items-center gap-2 my-2">
          <p>Available Quantity</p>
          {isLoading ? (
            <Spinner />
          ) : (
            <p>{GroupObj && GroupObj?.available_quantity}</p>
          )}
        </div>
        <div className="flex justify-between place-items-center gap-2 my-2">
          <p>Occurs_at Date</p>
          {isLoading ? (
            <Spinner />
          ) : (
            <p>
              {GroupObj && GroupObj?.event?.occurs_at?.slice(0, 10)} /{" "}
              {GroupObj && GroupObj?.event?.occurs_at?.slice(11, 16)}
            </p>
          )}
        </div>
        <div className="flex justify-between place-items-center gap-4 my-2">
          <div className="flex justify-between place-items-center gap-2 w-full ">
            <p className="font-bold">Section</p>
            <select
              className=" border-[1px] px-3 py-1 w-[200px] bg-color2 text-color1 outline-none"
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setrow("");
              }}
            >
              <option value="">Select Section</option>
              {NotDuplicate?.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          ||{" "}
          <div className="flex justify-between place-items-center gap-2 w-full">
            <p className="font-bold">Row</p>
            {section ? (
              <select
                className=" border-[1px] px-3 py-1 w-[200px]  bg-color2 text-color1 outline-none"
                value={row}
                onChange={(e) => {
                  setrow(e.target.value);
                  setQTY(null);
                  const selectedItem = SelectedRowArray.find(
                    (item) => item.row === e.target.value
                  );
                  setGroupId(selectedItem.id);
                }}
              >
                <option value="">Select Row</option>
                {SelectedRowArray?.map((item, index) => {
                  return (
                    <option
                      value={item.row}
                      key={index}
                      onClick={() => console.log(item)}
                    >
                      {item.row}
                    </option>
                  );
                })}
              </select>
            ) : (
              "First select the section "
            )}
          </div>
          {GroupsEvents?.length > 0 &&
            GroupsEvents[0]?.seat_numbers &&
            "||" +
            (
              <div className="flex justify-between place-items-center gap-2 w-full">
                <p>Row</p>
                <p>
                  {GroupsEvents?.length > 0 &&
                    GroupsEvents[0]?.seat_numbers}
                </p>
              </div>
            )}
        </div>
        <div className="flex justify-between place-items-center gap-2 my-2">
          <p>Type</p>
          <p>{GroupsEvents?.length > 0 && GroupsEvents[0]?.type}</p>
        </div>
        {GroupsEvents?.length > 0 && GroupsEvents[0]?.seat_numbers && (
          <div className="flex justify-between place-items-center gap-2 my-2">
            <p>Seat Numbers</p>
            <p>
              {GroupsEvents?.length > 0 && GroupsEvents[0]?.seat_numbers}
            </p>
          </div>
        )}
        <hr class="bg-gray-200 w-full mb-4" />
        <div class="flex flex-row justify-between">
          <p class="font-medium text-base leading-4 text-gray-600 ">
            Select quantity
          </p>
         
          {GroupObj && Object.keys(GroupObj).length !== 0 && row ? (
            <>
              <select
                className=" border-[1px] w-[200px] px-2 py-1  bg-color2 text-color1 outline-none"
                value={qty}
                onChange={(e) => setQTY(e.target.value)}
              >
                <option value="">Select Split</option>
                {GroupObj?.splits?.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            "select the row"
          )}
        </div>
        <hr class="bg-gray-200 w-full my-2" />
      </div>

      <p class="font-normal text-base leading-6 text-gray-600  mt-7">
        {GroupsEvents?.length > 0 && GroupsEvents[0]?.public_notes}
      </p>

      <div className="flex justify-between place-items-center gap-4">
        <button
          class="focus:outline-none flex justify-center place-items-center gap-2  focus:ring-2 hover:bg-color1 hover:text-color2 hover:border-[1px] focus:ring-offset-2 disabled:cursor-no-drop disabled:bg-gray-500 focus:ring-gray-800 font-medium text-base leading-4 text-color1 bg-color2 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          disabled={
            Object.keys(GroupObj).length == 0 || isLoading || !row || !qty
          }
          onClick={addtocart}
        >
          Add to Cart {isLoading && <Spinner />}
        </button>
        <button
          class="focus:outline-none focus:ring-2  flex justify-center place-items-center gap-2 hover:bg-color1 hover:text-color2 hover:border-[1px] focus:ring-offset-2 disabled:cursor-no-drop disabled:bg-gray-500 focus:ring-gray-800 font-medium text-base leading-4 text-color1 bg-color2 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          disabled={
            Object.keys(GroupObj).length == 0 || isLoading || !row || !qty
          }
          onClick={placeorder}
        >
          Buy Now
          {isLoading && <Spinner />}
        </button>
      </div>
    </div>
  ) : (
    <p>No Ticket found</p>
  )}
</div>
</div> */
}
