import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOrders } from "../../../redux/reducers/UserOrders";
import { UserOrdersFunc } from "../../../redux/actions/UserOrder";
import "../style/profile.css";

const AllOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserOrdersFunc());
  }, []);
  const UserOrders = useSelector((state) => state.order.UserOrders);
  console.log(UserOrders);
  return (
    <div className="py-5 px-5 w-[100%] ">
      <h2 className="my-3 font-bold text-[25px]">
        Total Orders ({UserOrders?.length})
      </h2>
      {/* ---  */}

      <div className="max-w-[1000px] xl:max-w-[100%]">
        <div class=" shadow-md sm:rounded-lg ">
          <table class="w-full  text-sm text-left rtl:text-right border-[1px] border-color3 rounded-sm  dark:text-gray-400 !bg-color1 !text-color2">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  OrderId
                </th>
                <th scope="col" class="px-6 py-3">
                  Ticket Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Tickets
                </th>
                <th scope="col" class="px-6 py-3">
                  Toatl Amount
                </th>

                <th scope="col" class="px-6 py-3">
                  Payment Method
                </th>

                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {UserOrders?.map((item, index) => {
                return (
                  <tr
                    class={`!bg-color1  !text-color2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                    
                    ${index % 2 !== 0 ? "!bg-color3" : "bg-color1"}
                    `}
                    key={index}
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                    >
                      #{item?._id?.slice(0, 5)}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                    >
                      {item?.type}
                      name
                    </th>
                    <td class="px-6 py-4">{item?.status}</td>
                    <td class="px-6 py-4">{item?.items?.length}</td>
                    <td class="px-6 py-4">${item?.totalAmount}</td>
                    <td class="px-6 py-4">{item?.payments}</td>
                    <td class="flex items-center px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
