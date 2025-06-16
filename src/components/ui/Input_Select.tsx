import { FilterOptions } from "@/config/types";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { NumericFormatProps } from "react-number-format";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Number_Input } from "./Number_Input";
import { cn } from "@/lib/utils";

interface Input_SelectProps extends NumericFormatProps {
  inputName: string;
  selectName: string;
  label: string;
  options: FilterOptions<string, string>;
  prefix?: string;
}

const Input_Select = (props: Input_SelectProps) => {
  const { inputName, selectName, label, options, prefix, ...numberInputProps } =
    props;
  const form = useFormContext();
  return (
    <div className=" w-full relative">
      <FormField
        control={form.control}
        name={inputName}
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            {label && <FormLabel htmlFor={inputName}>{label}</FormLabel>}
            <FormControl>
              <Number_Input
                style={{ backgroundColor: "#081a2b" }}
                className=" text-muted/75"
                onValueChange={(value) => {
                  onChange(value.floatValue);
                }}
                {...rest}
                {...numberInputProps}
              ></Number_Input>
            </FormControl>
            <FormMessage className=" text-sm text-red-500"></FormMessage>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name={selectName}
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <div className="absolute ring-0 -translate-y-10 h-10 flex items-center pr-2 border-l border-l-white border-input">
                <select
                  className={cn(
                    "custom-select appearance-none bg-no-repeat pr-10 disabled:bg-white/10 border  rounded-md focus:outline-hidden focus:ring-0 focus-visible:ring-0 pl-3 text-muted/75 border-transparent"
                  )}
                  {...rest}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </FormControl>
            <FormMessage className=" text-sm text-red-500"></FormMessage>
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

export default Input_Select;
