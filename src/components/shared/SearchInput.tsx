"use client";
import { useQueryState } from "nuqs";
import React, { ChangeEvent, useCallback, useRef } from "react";
import debounce from "debounce";
import { SearchIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// This function is used to debounce the search input, which means it will wait for a second before executing the function passed to it. This is useful for preventing too many requests being sent to the server when the user is typing in the search input.

// Wraps setSearch in a debounced function
// 1000ms (1 second) delay before updating URL
// immediate: false means it waits for pause in typing

function debouncFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean }
) {
  return debounce(func, wait, opts);
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { className, ...rest } = props;
  const [q, setSearch] = useQueryState("q", { shallow: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    debouncFunc(
      (value: string) => {
        setSearch(value || null);
      },
      1000,
      { immediate: false }
    ),
    []
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newvalue = e.target.value;
    handleSearch(newvalue);
  };
  const clearSearch = () => {
    setSearch(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <form className=" relative flex-1">
      <SearchIcon className=" absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <input
        ref={inputRef}
        defaultValue={q || ""}
        className={cn(className, "pl-8")}
        onChange={onChange}
        type="text"
        {...rest}
      ></input>
      {q && (
        <XIcon
          className=" absolute right-2.5 top-2.5 h-4 w-4 text-white bg-gray-500 p-0.5 rounded-full cursor-pointer"
          onClick={clearSearch}
        ></XIcon>
      )}
    </form>
  );
};

export default SearchInput;
