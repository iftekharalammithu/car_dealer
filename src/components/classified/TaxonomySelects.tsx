"use client";
import { FilterOptions } from "@/config/types";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const TaxonomySelects = () => {
  const form = useFormContext();
  const defaultMake = form.getValues("make") || null;
  const defaultModel = form.getValues("model") || null;

  const [make, setMake] = useState<string | null>(defaultMake);
  const [makes, setMakes] =
    useState<FilterOptions<string, string>>(defaultMake);

  const [model, setModel] = useState<string | null>(defaultModel);
  const [models, setModels] =
    useState<FilterOptions<string, string>>(defaultModel);

  return <div></div>;
};

export default TaxonomySelects;
