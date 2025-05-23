"use client";
import React from "react";
import SearchInput from "../shared/SearchInput";
import { usePathname } from "next/navigation";

const Search = () => {
  const pathname = usePathname();
  return (
    <div>
      <SearchInput
        className="w-full  px-3 py-2 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus-visible:ring-0 placeholder:text-muted text-muted bg-primary-800 appearance-auto border border-purple-800 pl-8 "
        placeholder={`Search ${pathname.split("/")[2]}...`}
      ></SearchInput>
    </div>
  );
};

export default Search;
