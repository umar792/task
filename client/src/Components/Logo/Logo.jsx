import React from "react";
import { NavLink } from "react-router-dom";
const Logo = () => {
  return (
    <div className="logo  gap-3 w-[300px] relative">
      <NavLink
        to="/"
        className=" title-font font-medium text-gray-900 z-20 relative"
      >
        <div className="w-[200px] absolute top-0 left-0 bg-redColor h-[25px] z-[-1] blur-[25px] duration-300 logobluer"></div>
        <p className="text-center text-[25px] text-redColor font-bold">
          Tickets Play
        </p>
      </NavLink>
    </div>
  );
};

export default Logo;
