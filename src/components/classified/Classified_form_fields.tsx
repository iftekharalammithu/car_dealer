"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import Select from "../ui/select";
import { generateYears } from "@/lib/utils";
import TaxonomySelects from "./TaxonomySelects";
import Input_Select from "../ui/Input_Select";
import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
} from "@prisma/client";
import { Input } from "../ui/input";
import { Number_Input } from "../ui/Number_Input";

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
      <Input_Select
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
        label="Price"
        inputName="price"
        selectName="currency"
        inputMode="numeric"
        placeholder="0"
        className=" h-10"
      ></Input_Select>
      <Input_Select
        options={Object.values(OdoUnit).map((value) => ({
          label: value,
          value,
        }))}
        label="Odometer Reading"
        inputName="odoReading"
        selectName="odoUnit"
        inputMode="numeric"
        placeholder="0"
        className=" h-10"
      ></Input_Select>
      <FormField
        control={form.control}
        name="transmission"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="transmission">Transmission</FormLabel>
            <FormControl>
              <Select
                selectClassName=" text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(Transmission).map((value) => ({
                  label: value,
                  value,
                }))}
                {...rest}
              ></Select>
            </FormControl>
          </FormItem>
        )}
      ></FormField>

      <FormField
        control={form.control}
        name="fuelType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="fuelType">Fuel Type</FormLabel>
            <FormControl>
              <Select
                selectClassName=" text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(FuelType).map((value) => ({
                  label: value,
                  value,
                }))}
                {...rest}
              ></Select>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="bodyType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="bodyType">Body Type</FormLabel>
            <FormControl>
              <Select
                selectClassName=" text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(BodyType).map((value) => ({
                  label: value,
                  value,
                }))}
                {...rest}
              ></Select>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="color"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="color">Color</FormLabel>
            <FormControl>
              <Select
                selectClassName=" text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(Color).map((value) => ({
                  label: value,
                  value,
                }))}
                {...rest}
              ></Select>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="vrm"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="vrm">Vehicle Registration Mark</FormLabel>
            <FormControl>
              <Input
                placeholder="LA16 PYW"
                className=" uppercase text-muted/75 bg-primary-800  placeholder:text-muted/75 h-10 mt-1 "
                {...rest}
              ></Input>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="doors"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="doors">Doors</FormLabel>
            <FormControl>
              <Number_Input
                max={6}
                min={1}
                placeholder="0"
                style={{ background: "#081a2b" }}
                className=" text-muted placeholder:text-muted/75"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              ></Number_Input>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="seats"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="seats">Seats</FormLabel>
            <FormControl>
              <Number_Input
                max={6}
                min={1}
                placeholder="0"
                style={{ background: "#081a2b" }}
                className=" text-muted placeholder:text-muted/75"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              ></Number_Input>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

export default Classifiedformfields;
