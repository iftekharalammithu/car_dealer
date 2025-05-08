"use client";
import { routes } from "@/config/route";
import { SidebarProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import Select from "../ui/select";
import {
  cn,
  formatBodyType,
  formatColor,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import SearchInput from "../shared/SearchInput";
import TaxonomyFilter from "./TaxonomyFilter";
import RangeFilter from "./RangeFilter";
import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";

interface DialogFiltersProps extends SidebarProps {
  count: number;
}

const DialogFilters = (props: DialogFiltersProps) => {
  const { minMaxValues, searchParams, count } = props;
  const { _min, _max } = minMaxValues;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  const [queryStates, setQueryStates] = useQueryStates(
    {
      makt: parseAsString.withDefault(""),
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
      color: parseAsString.withDefault(""),
    },
    { shallow: false }
  );

  // this is used to set FilterCount Top of the sidebar
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
    router.replace(url.toString());
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // console.log("Name", name, "Value", value);

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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size={"icon"} className=" lg:hidden">
            <Settings2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className=" max-w-[425px] h-[90vh] overflow-y-auto rounded-xl">
          <div className="space-y-6">
            <div>
              <div className=" text-lg font-semibold  flex justify-between px-4">
                <DialogTitle>Filters</DialogTitle>
                <span>Filters</span>
                <Button
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
                </Button>
              </div>
              <div className=" mt-2"></div>
            </div>
            <SearchInput
              placeholder="Search  Classifiers..."
              className=" w-full  px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            ></SearchInput>
            <div className="  space-y-2">
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
                name="currency"
                value={queryStates.currency || ""}
                onChange={handleChange}
                options={Object.values(CurrencyCode).map((value) => ({
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
                name="fuelType"
                value={queryStates.fuelType || ""}
                onChange={handleChange}
                options={Object.values(FuelType).map((value) => ({
                  label: formatFuelType(value),
                  value,
                }))}
              ></Select>
              <Select
                label="Body Type"
                name="bodyType"
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
                value={queryStates.color || ""}
                onChange={handleChange}
                options={Object.values(Color).map((value) => ({
                  label: formatColor(value),
                  value,
                }))}
              ></Select>
              <Select
                label="ULEZ Complaince"
                name="ulezCompliance"
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
          <div className=" flex flex-col space-y-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className=" w-full"
            >
              Search{count > 0 ? `(${count})` : null}
            </Button>
            {filterCount > 0 && (
              <Button
                type="button"
                variant="outline"
                aria-disabled={!filterCount}
                onClick={clearFilters}
                className={cn(
                  "text-sm",
                  !filterCount
                    ? "disabled opacity-50 pointer-events-none cursor-default"
                    : "hover:underline "
                )}
              >
                Clear All {filterCount ? `(${filterCount})` : null}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogFilters;
