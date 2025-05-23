import React from "react";
import Search from "../Admin/Search";

const AdminHeader = () => {
  return (
    <header className=" flex h-[60px] items-center gap-4 px-6">
      <div className=" items-center flex-1 gap-4 md:gap-8 grid grid-cols-3 w-full">
        <div className=" col-span-1">
          <Search></Search>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
