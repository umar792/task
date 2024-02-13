import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style/profile.css";
import Sidebar from "./sidebar/Sidebar";
import Dashboard from "./DashBoard/Dashboard";
import AllOrders from "./AllOrders/AllOrders";
import AccountDetails from "./accountDeails/AccountDetails";
import UserAddress from "./UserAddress/UserAddress";
import { ApiMediaURL } from "../../setting/GlobleVariable";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Index = () => {
  const user = useSelector((state) => state.user.user);
  const [active, setActive] = useState(0);
  const UserAvatar = ApiMediaURL + user?.Avatar;
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="absolute top-0 left-0 h-[100vh] !bg-color1 !text-color2 z-40 profile w-[100%] overflow-x-auto">
      <div
        className={`w-[100%]  bg-color1
          min-w-[300px]
          ${
            showSidebar
              ? "profileSidebar_mobile profileSidebar"
              : "profileSidebar"
          }
          
      `}
      >
        <Sidebar
          active={active}
          setactive={setActive}
          sidebarShow={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
      {/* ---- content  */}
      <div className="w-[100%] overflow-hidden">
        <div className="bg-color1 text-color2 border-b-[1px] border-b-color4 w-[100%] py-4 px-4 shadow-md flex justify-between place-items-center">
          <RxHamburgerMenu
            className="cursor-pointer text-[25px] profileburger"
            onClick={() => setShowSidebar(true)}
          />
          <div className="mx-1 flex justify-start place-items-center">
            {user && user?.Avatar ? (
              <NavLink to="/user/profile" className="!w-[40px] !h-[40px]">
                {user?.firstName && user?.Avatar && (
                  <img
                    src={UserAvatar}
                    className="!w-[40px] !h-[40px] rounded-full border-[1px] border-redColor"
                    alt=""
                  />
                )}
              </NavLink>
            ) : (
              <p className="border-[1px] uppercase border-redColor rounded-full p-3 h-[40px] w-[40px] flex justify-center place-items-center bg-color1 text-[white] font-bold">
                {user?.firstName?.slice(0, 1)}
              </p>
            )}
            <p className="text-color5 mx-1">{user?.firstName}</p>
          </div>
        </div>

        {/* ------- content  */}
        {active === 0 && (
          <div className="h-[90vh] flex justify-center place-items-center">
            <Dashboard />{" "}
          </div>
        )}
        <div className="w-[100%] !overflow-x-auto ">
          {active === 1 && <AllOrders />}
        </div>
        {active === 2 && <AccountDetails />}
        <div className="w-[100%] !overflow-x-auto ">
          {active === 3 && <UserAddress />}
        </div>
      </div>
    </div>
  );
};

export default Index;
