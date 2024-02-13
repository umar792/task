import React from "react";

const Header = () => {
  return (
    <div className="py-4 px-[100px] !bg-color1 !text-color2 border-b-[1px] border-b-color4">
      <button className="mx-2 border-[1px] border-color5 bg-color4 px-5 py-2 cursor-pointer rounded-lg hover:bg-color2 hover:text-color1">
        Low to Hight
      </button>
      <button className="mx-2 border-[1px] border-color5 bg-color4 px-5 py-2 cursor-pointer rounded-lg hover:bg-color2 hover:text-color1">
        Hight to Low
      </button>
    </div>
  );
};

export default Header;
