import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { MdPassword } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LogoutUserFunc } from "../../../redux/actions/User";
import Logo from "../../Logo/Logo";
import { RxCross1 } from "react-icons/rx";

const Sidebar = ({ active, setactive, sidebarShow, setShowSidebar }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-color1 text-color2 h-[100vh] border-r-[1px] border-r-color4 sticky top-0">
      {/* --- header  */}
      <div className="flex justify-between shadow-md place-items-start gap-2 py-[26px] px-3">
        {/* <img src={logo} alt="" className="w-[130px] object-contain" /> */}
        <Logo />
        {/* <IoMenuSharp className="text-[25px]" /> */}
        <RxCross1
          className="text-[23px] cursor-pointer profileburger"
          onClick={() => setShowSidebar(false)}
        />
      </div>
      {/* ------- menus  */}
      <div className="py-5 px-3">
        <NavLink to="/" onClick={() => setShowSidebar(false)}>
          <div
            className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md `}
          >
            <IoHomeOutline className="text-[25px] text-[#CD292E]" />
            <p className="text-[20px] font-normal text-color2">Home</p>
          </div>
        </NavLink>

        <div
          className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md ${
            active === 0 ? "bg-[#d9d9daf9] !text-color1" : null
          }`}
          onClick={() => {
            setactive(0);
            setShowSidebar(false);
          }}
        >
          <LuLayoutDashboard className="text-[25px] text-[#CD292E]" />
          <p className="text-[20px] font-normal text-color2">DashBoard</p>
        </div>
        <div
          className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md ${
            active === 1 ? "bg-[#d9d9daf9] !text-color1" : null
          }`}
          onClick={() => {
            setactive(1);
            setShowSidebar(false);
          }}
        >
          <FiShoppingBag className="text-[25px] text-[#CD292E]" />
          <p className="text-[20px] font-normal">Orders</p>
        </div>
        <div
          className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md ${
            active === 2 ? "bg-[#d9d9daf9] !text-color1 " : null
          }`}
          onClick={() => {
            setactive(2);
            setShowSidebar(false);
          }}
        >
          <MdPassword className="text-[25px] text-[#CD292E]" />
          <p className="text-[20px] font-normal ">Account Details</p>
        </div>
        <div
          className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md ${
            active === 3 ? "bg-[#d9d9daf9] !text-color1" : null
          }`}
          onClick={() => {
            setactive(3);
            setShowSidebar(false);
          }}
        >
          <IoLocationOutline className="text-[25px] text-[#CD292E]" />
          <p className="text-[20px] font-normal 2">Address</p>
        </div>
        <div
          className={`flex justify-start place-items-center gap-3 mb-3 py-2 px-2 cursor-pointer hover:bg-[#d9d9daf9] rounded-md `}
          onClick={() => {
            dispatch(LogoutUserFunc(navigate));
            setShowSidebar(false);
          }}
        >
          <RiLogoutCircleLine className="text-[25px] text-[#CD292E]" />
          <p className="text-[20px] font-normal ">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
