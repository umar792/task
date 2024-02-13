import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./UserAddress.css";
import CreateAddressModal from "./CreateAddressModal";

const UserAddress = () => {
  const [ShowModal, setShowModal] = useState(false);
  return (
    <div className="py-5 px-5">
      <div className="w-full flex justify-between place-items-center">
        <h2 className="text-[25px] font-bold mb-3">Your Available Address.</h2>
        <button
          className="flex justify-between place-items-center gap-2 px-5 my-2 rounded-md mx-2 py-2 bg-color1 border-[1px] text-color2 hover:bg-color2 hover:text-color1 hover:border-[1px]"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add New
          <AiOutlinePlus />
        </button>
      </div>

      {/* ----- table  */}

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%] my-[50px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ad_table">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Address Name
              </th>
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Country
              </th>
              <th scope="col" class="px-6 py-3">
                City
              </th>
              <th scope="col" class="px-6 py-3">
                Postal Code
              </th>
              <th scope="col" class="px-6 py-3">
                Email Address
              </th>
              <th scope="col" class="px-6 py-3">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody className="!bg-color1 !text-color2">
            <tr class=" border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
              <th
                scope="row"
                class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">3.0 lb.</td>
              <td class="flex items-center px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Remove
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* ------ modal  */}
      {ShowModal && <CreateAddressModal setHideModal={setShowModal} />}
    </div>
  );
};

export default UserAddress;
