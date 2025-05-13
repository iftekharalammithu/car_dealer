"use client";
import { AwaitedPageProps, SidebarProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import React from "react";
import TaxonomyFilter from "../Inventory/TaxonomyFilter";
import RangeFilter from "../Inventory/RangeFilter";

const HomePageFilters = ({ searchParams, minMaxValues }: SidebarProps) => {
  const { _min, _max } = minMaxValues;
  const router = useRouter();
  const [state, setstate] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
    },
    { shallow: false }
  );

  const handleChage = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "make":
        await setstate({ make: value, model: null, modelVariant: null });
        break;
      case "model":
        await setstate({ model: value, modelVariant: null });
        break;
      default:
        await setstate({ [name]: value });
    }
  };

  return (
    <>
      <TaxonomyFilter
        handleChange={handleChage}
        searchParams={searchParams}
      ></TaxonomyFilter>
      <RangeFilter
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMax={_max.year || new Date().getFullYear()}
        defaultMin={_min.year || 1925}
        handleChange={handleChage}
        searchParams={searchParams}
      ></RangeFilter>
      <RangeFilter
        label="Price"
        minName="minPrice"
        maxName="maxPrice"
        defaultMax={_max.price || 21474836}
        currency={{ currencyCode: "GBP" }}
        increment={10000}
        thousandSeparator
        defaultMin={_min.price || 0}
        handleChange={handleChage}
        searchParams={searchParams}
      ></RangeFilter>
    </>
  );
};

export default HomePageFilters;
