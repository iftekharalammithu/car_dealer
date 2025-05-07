import { FilterOptions, TaxonomyFilterProps } from "@/config/types";
import { CurrentCode } from "@prisma/client";
import React, { useEffect, useState } from "react";
import RangeSelect from "../ui/RangeSelect";
import { formatNumber, formatPrice } from "@/lib/utils";

interface RangeFilterProps extends TaxonomyFilterProps {
  label: string;
  minName: string;
  maxName: string;
  defaultMin: number;
  defaultMax: number;
  increment?: number;
  thousandSeparator?: boolean;
  currency?: {
    currencyCode: CurrentCode;
  };
}

const RangeFilter = ({
  label,
  minName,
  maxName,
  defaultMax,
  defaultMin,
  increment,
  thousandSeparator,
  currency,
  searchParams,
  handleChange,
}: RangeFilterProps) => {
  const getInitialState = () => {
    const state: FilterOptions<string, number> = [];
    let iterator = defaultMin;

    do {
      if (increment) {
        iterator = iterator + increment;
      } else {
        iterator++;
      }
      if (currency) {
        state.push({
          label: formatPrice({
            price: iterator,
            currency: currency.currencyCode,
          }),
          value: iterator,
        });
      } else if (thousandSeparator) {
        state.push({
          label: formatNumber(iterator),
          value: iterator,
        });
      } else {
        state.push({
          label: iterator.toString(),
          value: iterator,
        });
      }
    } while (iterator < defaultMax);
    return state;
  };

  const initialState = getInitialState();

  const [minOptions, setMinOptions] =
    useState<FilterOptions<string, number>>(initialState);
  const [maxOptions, setMaxOptions] = useState<FilterOptions<string, number>>(
    initialState.toReversed()
  );

  useEffect(() => {
    // console.log("Search Params", searchParams);
    // console.log(`Min Name`, searchParams[minName]);
    // console.log(`Max Name`, searchParams[maxName]);
    // console.log("Initial State", initialState);
    if (searchParams?.[minName]) {
      setMaxOptions(
        initialState.filter(
          ({ value }) => value > Number(searchParams[minName])
        )
      );
    }
    if (searchParams?.[maxName]) {
      setMinOptions(
        initialState.filter(
          ({ value }) => value < Number(searchParams[maxName])
        )
      );
    }
  }, [searchParams?.[minName], searchParams?.[maxName]]);
  return (
    <RangeSelect
      label={label}
      minSelect={{
        name: minName,
        value: Number(searchParams?.[minName]) || "",
        onChange: handleChange,
        options: minOptions,
      }}
      maxSelect={{
        name: maxName,
        value: Number(searchParams?.[maxName]) || "",
        onChange: handleChange,
        options: maxOptions,
      }}
    ></RangeSelect>
  );
};

export default RangeFilter;
