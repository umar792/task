import React from "react";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ApiMediaURL } from "../../../setting/GlobleVariable";
import accountimage from "../../../assets/no_image_user.png";

const AccountDetails = () => {
  const user = useSelector((state) => state.user.user);
  const UserAvatar = ApiMediaURL + user?.Avatar;
  return (
    <div className="py-2 px-2 bg-color1 text-color2 h-[90vh] overflow-y-auto">
      <h2 className="text-[25px] py-2 px-2 font-bold">Account Deatils.</h2>
      {/* --- profile image  */}
      <div className="w-[100%] my-3 flex justify-center place-items-center border-b-[1px] border-b-color4 pb-1">
        <div className="relative">
          <img
            // src="https://tse4.mm.bing.net/th?id=OIP.Rp9RK3Wm49_KJ9P_DnhLBAHaFI&pid=Api&P=0&h=220"
            src={user && user?.Avatar ? UserAvatar : accountimage}
            alt=""
            className="object-contain w-[200px] h-[200px] rounded-full border-[2px] border-color5"
          />
          <FaCamera className="absolute bottom-[10px] right-[20px] cursor-pointer text-color5 text-[35px]" />
        </div>
      </div>
      {/* ===== body  */}
      <div className="px-2 sm:px-5">
        <h2 className="sm:text-[25px] text-[20px] py-2 px-2">
          General information.
        </h2>
        <div className="flex justify-start place-items-center gap-2 sm:flex-row flex-col">
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
        </div>
        {/* ---  */}
        <div className="flex justify-start place-items-center gap-2 sm:flex-row flex-col">
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              Email Address
            </label>
            <input
              type="text"
              placeholder="example@example.com"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
        </div>
        <button className="px-5 my-2 rounded-md mx-2 py-2 bg-color1 border-[1px] text-color2 hover:bg-color2 hover:text-color1 hover:border-[1px]">
          Update
        </button>
      </div>
      {/* ------- pasword inportmation  */}
      <div className="px-2 py-3 sm:px-5">
        <h2 className="sm:text-[25px] text-[20px] py-2 px-2">
          Password information.
        </h2>
        <div className="flex justify-start place-items-center gap-2 sm:flex-row flex-col">
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              Current password
            </label>
            <input
              type="password"
              placeholder="************"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
          <div className="w-full px-2 py-2">
            <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
              New password
            </label>
            <input
              type="password"
              placeholder="************"
              className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full px-2 py-2">
          <label htmlFor="" className="w-[100%] block mb-1 font-bold px-2">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="************"
            className="w-[100%] border-[1px] border-color4 bg-color4 outline-none px-3 py-2 !text-color2 rounded-md"
          />
        </div>
        <button className="px-5 my-2 rounded-md mx-2 py-2 bg-color1 border-[1px] text-color2 hover:bg-color2 hover:text-color1 hover:border-[1px]">
          Update
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
