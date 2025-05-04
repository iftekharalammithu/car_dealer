"use client";
import { routes } from "@/config/route";
import { AwaitedPageProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";
import SearchInput from "../shared/SearchInput";
import TaxonomyFilter from "./TaxonomyFilter";

interface SidebarProps extends AwaitedPageProps {
  minMaxValues: any;
}

const Sidebar = ({ minMaxValues, params, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      door: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
      ulezCompliance: parseAsString.withDefault(""),
    },
    { shallow: false }
  );

  useEffect(() => {
    console.log("Sidebar Search Params");
    const filterCount = Object.entries(
      searchParams as Record<string, string>
    ).filter(([keyframes, value]) => {
      console.log("Keyframe:", keyframes, "Value:", value); // Log keyframes and value
      return keyframes !== "page" && value.length;
    });

    setFilterCount(filterCount.length);
  }, [searchParams]);
  const clearFilters = () => {
    const url = new URL(routes.inventory, process.env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQueryStates({
      [name]: value || null,
    });
    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }
    router.refresh();
  };

  return (
    <div className=" py-4 bdr w-[21.25rem] bg-white  border-r border-muted block">
      <div>
        <div className=" text-lg font-semibold  flex justify-between px-4">
          <span>Filters</span>
          <button
            onClick={clearFilters}
            aria-disabled={!filterCount}
            className={cn(
              "text-sm text-gray-500 py-1",
              !filterCount
                ? "disabled opacity-50 pointer-events-none cursor-default"
                : "hover:underline cursor-pointer"
            )}
          >
            Clear All {filterCount ? `(${filterCount})` : null}
          </button>
        </div>
        <div className=" mt-2"></div>
      </div>
      <div className=" p-4">
        <SearchInput
          placeholder="Search  Classifiers..."
          className=" w-full  px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        ></SearchInput>
      </div>
      <div className=" p-4 space-y-2">
        <TaxonomyFilter
          searchParams={searchParams}
          handleChange={handleChange}
        ></TaxonomyFilter>
      </div>
    </div>
  );
};

export default Sidebar;
