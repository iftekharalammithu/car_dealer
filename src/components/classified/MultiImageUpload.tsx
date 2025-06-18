import { updateClassifiedType } from "@/app/schemas/Classified.Schema";
import React, { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

interface MultiImageUpload extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

type ClassifiedImages = updateClassifiedType["images"];
type ImageProgress = {
  uuid: string;
  progress: number;
};

const MultiImageUpload = (props: MultiImageUpload) => {
  const form = useFormContext<updateClassifiedType>();
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "uuid",
  });

  const [items, setItems] = useState<ClassifiedImages>(fields);
  const [progress, setProgress] = useState<ImageProgress[]>([]);
  const [isUploading, setIsuploading] = useState(false);

  const handleItemProgress = useCallback((updates: ImageProgress) => {
    setProgress((prev) => {
      const index = prev.findIndex((item) => item.uuid === updates.uuid);
      if (index === -1) {
        return [...prev, updates];
      }
      const newProgress = [...prev];
      newProgress[index] = { ...newProgress[index], ...updates };
      return newProgress;
    });
  }, []);

  return <div></div>;
};

export default MultiImageUpload;
