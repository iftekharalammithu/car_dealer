"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import Select from "../ui/select";
import { generateYears } from "@/lib/utils";
import TaxonomySelects from "./TaxonomySelects";

const years = generateYears(1925);

const Classifiedformfields = () => {
  const form = useFormContext();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  text-muted">
      <FormField
        control={form.control}
        name="year"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="year">Year</FormLabel>
            <FormControl>
              <Select
                selectClassName=" text-muted/75 bg-primary-800 border-transparent"
                options={years.map((year) => ({
                  label: year,
                  value: year,
                }))}
                {...rest}
              ></Select>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <TaxonomySelects></TaxonomySelects>
    </div>
  );
};

export default Classifiedformfields;
