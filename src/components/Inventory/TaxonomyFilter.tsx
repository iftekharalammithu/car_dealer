"use client";
import { FilterOptions, TaxonomyFilterProps } from "@/config/types";
import React, { useEffect, useState } from "react";
import Select from "../ui/select";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";

const TaxonomyFilter = (props: TaxonomyFilterProps) => {
  const { searchParams, handleChange } = props;
  // console.log("Search Params", searchParams);
  const [makes, setmakes] = useState<FilterOptions<string, string>>([]);
  const [model, setmodel] = useState<FilterOptions<string, string>>([]);
  const [modelVariant, setmodelVariant] = useState<
    FilterOptions<string, string>
  >([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      // console.log("taxonomy filter", searchParams);
      for (const [key, value] of Object.entries(
        searchParams as Record<string, string>
      )) {
        // console.log("calling api...");
        if (value) {
          params.set(key, value as string);
        }
      }
      const url = new URL(endpoints.taxonomy, window.location.href);
      url.search = params.toString();
      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());
      // console.log("Data From Tax ==> ", data);
      setmakes(data.makes);
      setmodel(data.models);
      setmodelVariant(data.modelVariants);
    })();
  }, [searchParams]);

  return (
    <>
      <Select
        label="Make"
        name="make"
        value={searchParams?.make as string}
        options={makes}
        onChange={handleChange}
      ></Select>
      <Select
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={model}
        onChange={handleChange}
        disabled={!model.length}
      ></Select>
      <Select
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.model as string}
        options={modelVariant}
        onChange={handleChange}
        disabled={!modelVariant.length}
      ></Select>
    </>
  );
};

export default TaxonomyFilter;
