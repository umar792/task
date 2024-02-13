import React from "react";
import { RxCross1 } from "react-icons/rx";

const CreateAddressModal = ({ setHideModal }) => {
  return (
    <div class="fixed left-0 top-0 flex  h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div class="max-h-full relative w-full max-w-xl overflow-y-auto sm:rounded-2xl !bg-color4 !text-color2">
        <RxCross1
          className="absolute top-3 right-3 text-[23px] cursor-pointer"
          onClick={() => {
            setHideModal(false);
          }}
        />
        <div class="w-full py-3 px-3">
          <h2 className="text-center text-[25px] font-bold mb-2">
            Create new address
          </h2>
          {/* ------  */}
          <div className="my-2">
            <div className="my-2">
              <label htmlFor="" className="w-[100%] block mb-1 px-2">
                Address Name
              </label>
              <input
                type="text"
                placeholder="Enter Address Name"
                className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
              />
            </div>
            <div className="flex justify-start place-items-center gap-2 ">
              <div className="my-2 w-[100%]">
                <label htmlFor="" className="w-[100%] block mb-1 px-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
                />
              </div>
              <div className="my-2 w-[100%]">
                <label htmlFor="" className="w-[100%] block mb-1 px-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-start place-items-center gap-2 ">
              <div className="my-2 w-[100%]">
                <label htmlFor="" className="w-[100%] block mb-1 px-2">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Country Name"
                  className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
                />
              </div>
              <div className="my-2 w-[100%]">
                <label htmlFor="" className="w-[100%] block mb-1 px-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter Your City Name"
                  className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
                />
              </div>
            </div>
            <div className="my-2">
              <label htmlFor="" className="w-[100%] block mb-1 px-2">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Enter Your PostalCode"
                className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
              />
            </div>
            <div className="my-2">
              <label htmlFor="" className="w-[100%] block mb-1 px-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
              />
            </div>
            <div className="my-2">
              <label htmlFor="" className="w-[100%] block mb-1 px-2">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter Your Mobile Number"
                className="w-[100%] border-[1px] border-color3 bg-color1 outline-none px-3 py-2 !text-color2 rounded-md"
              />
            </div>
            <button className="bg-color1 text-color2 hover:bg-color2 hover:text-color1 hover:border-[1px] py-2 border-[1px] border-[black] px-3 cursor-pointer w-full mt-2 rounded-md">
              Create Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAddressModal;
