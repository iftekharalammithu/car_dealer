import { updateClassifiedType } from "@/app/schemas/Classified.Schema";
import { generateThumbHashFromSrcUrl } from "@/lib/thumb-hash-server";
import { generateThumbHashFromFile } from "@/lib/ThumbHash";
import React, { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createPngDataUri } from "unlazy/thumbhash";
import { v4 } from "uuid";
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

  const handleItemsUpdate = useCallback(
    (newItems: ClassifiedImages) => {
      replace(newItems);
      setItems(newItems);
    },
    [replace]
  );

  const setFiles = useCallback(async (validFiels: File[]) => {
    const files = Object.values(validFiels);
    setIsuploading(files.length > 0);

    let id = items.length + 1;
    const newImageData: ClassifiedImages = [];

    for (const file of files) {
      const uuid = v4();
      const hash = await generateThumbHashFromFile(file);
      const base64 = createPngDataUri(hash);

      const data = {
        id: id.toString(),
        uuid,
        percentage: 0,
        alt: file.name,
        key: "",
        src: "",
        base64,
        done: false,
      };
      newImageData.push(data);
      id++;
      const options = { file, uuid };
    }
  }, []);

  return <div></div>;
};

export default MultiImageUpload;
