import React from "react";
import { GoListUnordered } from "react-icons/go";
import { FaMapLocation } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { LogoutUserFunc } from "../../../redux/actions/User";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex-wrap  w-[100%] flex justify-center place-items-center gap-5">
      <div className="w-[230px]   h-[170px] cursor-pointer shadow-md rounded-md border-[1px] py-3 px-3 flex flex-col justify-center place-items-center gap-2">
        <MdDashboard className="text-[40px]" />
        <h2 className="text-[20px]">DashBoard</h2>
      </div>
      <div className="w-[230px] h-[170px] cursor-pointer shadow-md rounded-md border-[1px] py-3 px-3 flex flex-col justify-center place-items-center gap-2">
        <GoListUnordered className="text-[40px]" />
        <h2 className="text-[20px]">All Orders</h2>
      </div>
      <div className="w-[230px] h-[170px] cursor-pointer shadow-md rounded-md border-[1px] py-3 px-3 flex flex-col justify-center place-items-center gap-2">
        <FaMapLocation className="text-[40px]" />
        <h2 className="text-[20px]">Address</h2>
      </div>
      <div
        className="w-[230px] h-[170px] cursor-pointer shadow-md rounded-md border-[1px] py-3 px-3 flex flex-col justify-center place-items-center gap-2"
        onClick={() => dispatch(LogoutUserFunc(navigate))}
      >
        <RiLogoutCircleLine className="text-[40px]" />
        <h2 className="text-[20px] text-[red]">Logout</h2>
      </div>
    </div>
  );
};

export default Dashboard;
