"use client";
import { routes } from "@/config/route";
import { AwaitedPageProps } from "@/config/types";
import {
  cn,
  formatBodyType,
  formatColor,
  formatFualType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";
import SearchInput from "../shared/SearchInput";
import TaxonomyFilter from "./TaxonomyFilter";
import RangeFilter from "./RangeFilter";
import {
  BodyType,
  Color,
  CurrentCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import Select from "../ui/select";

interface SidebarProps extends AwaitedPageProps {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: {
      year: true;
      price: true;
      odoReading: true;
    };
    _max: {
      year: true;
      price: true;
      odoReading: true;
    };
  }>;
}

const Sidebar = ({ minMaxValues, params, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;
  // console.log(_min, _max);
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
    // console.log("Sidebar Search Params");
    const filterCount = Object.entries(
      searchParams as Record<string, string>
    ).filter(([keyframes, value]) => {
      // console.log("Keyframe:", keyframes, "Value:", value); // Log keyframes and value
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
    <div className=" py-4  w-[21.25rem] bg-white  border-r border-muted block">
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
      <div className=" p-4  space-y-2">
        <TaxonomyFilter
          searchParams={searchParams}
          handleChange={handleChange}
        ></TaxonomyFilter>
        <RangeFilter
          label="Year"
          minName="minYear"
          maxName="maxYear"
          defaultMin={_min.year || 1925}
          defaultMax={_max.year || new Date().getFullYear()}
          handleChange={handleChange}
          searchParams={searchParams}
        />
        <RangeFilter
          label="Price"
          minName="minPrice"
          maxName="maxPrice"
          defaultMin={_min.price || 0}
          defaultMax={_max.price || 21474836}
          handleChange={handleChange}
          searchParams={searchParams}
          thousandSeparator
          increment={10000}
          currency={{
            currencyCode: "GBP",
          }}
        />
        <RangeFilter
          label="Odometer Reading"
          minName="minReading"
          maxName="maxReading"
          defaultMin={_min.odoReading || 0}
          defaultMax={_max.odoReading || 1000000}
          handleChange={handleChange}
          searchParams={searchParams}
          increment={5000}
          thousandSeparator
        />
        <Select
          label="Currency"
          name="Currency"
          value={queryStates.currency || ""}
          onChange={handleChange}
          options={Object.values(CurrentCode).map((value) => ({
            label: value,
            value,
          }))}
        ></Select>
        <Select
          label="Odometer Unit"
          name="odoUnit"
          value={queryStates.odoUnit || ""}
          onChange={handleChange}
          options={Object.values(OdoUnit).map((value) => ({
            label: formatOdometerUnit(value),
            value,
          }))}
        ></Select>
        <Select
          label="Transmission"
          name="transmission"
          value={queryStates.transmission || ""}
          onChange={handleChange}
          options={Object.values(Transmission).map((value) => ({
            label: formatTransmission(value),
            value,
          }))}
        ></Select>
        <Select
          label="Fuel Type"
          name="fuel type"
          value={queryStates.fuelType || ""}
          onChange={handleChange}
          options={Object.values(FuelType).map((value) => ({
            label: formatFualType(value),
            value,
          }))}
        ></Select>
        <Select
          label="Body Type"
          name="body type"
          value={queryStates.bodyType || ""}
          onChange={handleChange}
          options={Object.values(BodyType).map((value) => ({
            label: formatBodyType(value),
            value,
          }))}
        ></Select>
        <Select
          label="Color"
          name="color"
          value={queryStates.bodyType || ""}
          onChange={handleChange}
          options={Object.values(Color).map((value) => ({
            label: formatColor(value),
            value,
          }))}
        ></Select>
        <Select
          label="ULEZ Complaince"
          name="ulez compliance"
          value={queryStates.ulezCompliance || ""}
          onChange={handleChange}
          options={Object.values(ULEZCompliance).map((value) => ({
            label: formatUlezCompliance(value),
            value,
          }))}
        ></Select>
        <Select
          label="Doors"
          name="door"
          value={queryStates.door || ""}
          onChange={handleChange}
          options={Array.from({ length: 6 }).map((_, i) => {
            return {
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            };
          })}
        ></Select>
        <Select
          label="Seats"
          name="seats"
          value={queryStates.seats || ""}
          onChange={handleChange}
          options={Array.from({ length: 8 }).map((_, i) => {
            return {
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            };
          })}
        ></Select>
      </div>
    </div>
  );
};

export default Sidebar;
