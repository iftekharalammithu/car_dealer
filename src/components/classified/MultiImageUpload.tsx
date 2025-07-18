import { updateClassifiedType } from "@/app/schemas/Classified.Schema";
import { ProgressArgs } from "@/config/types";
import { generateThumbHashFromFile } from "@/lib/ThumbHash";
import { Uploader } from "@/lib/Uploader";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createPngDataUri } from "unlazy/thumbhash";
import { v4 } from "uuid";
import DragAndDrop from "./DragAndDrop";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import SortableItem from "./SortableItem";

const DragAndDropContext = dynamic(
  () => import("./DragAndDropContext").then((mod) => mod.DragAndDropContext),
  {
    ssr: false,
    loading: () => (
      <div className=" gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-20 rounded-md w-full"></Skeleton>
        ))}
      </div>
    ),
  }
);

interface MultiImageUpload extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export type ClassifiedImages = updateClassifiedType["images"];
type ImageProgress = {
  uuid: string;
  progress: number;
};

const MultiImageUpload = (props: MultiImageUpload) => {
  const { className } = props;
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

  const setFiles = useCallback(
    async (validFiels: File[]) => {
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

        const uploader = new Uploader(options);
        uploader
          .onProgress((progress: ProgressArgs) => {
            if (progress.percentage !== data.percentage) {
              data.src = `${process.env.S3_URL}/${progress.key}`;
              data.key = progress.key || "";
              handleItemProgress({
                uuid,
                progress: progress.percentage,
              });
              const clone = items.concat(newImageData);
              setItems(clone);
            }
          })
          .onError((error: Error) => {
            setIsuploading(false);
            console.error(error);
          })
          .onComplete(() => {
            data.done = true;
            const clone = items
              .concat(newImageData)
              .map((item) => ({ ...item, percentage: 100 }));
            setItems(clone);
            replace(clone.map((item) => ({ src: item.src, alt: item.alt })));
            setIsuploading(false);
          });
        uploader.start();
      }
    },
    [items, handleItemProgress, replace]
  );
  const remove = (i: string) => {
    setItems((prev) => prev.filter((item) => item.id !== i));
    replace(items.filter((item) => item.id !== i));
  };

  return (
    <div className={cn(className, "space-y-3 mt-1")}>
      <DragAndDrop
        isUploading={isUploading}
        setIsUploading={setIsuploading}
        items={items}
        setFile={setFiles}
      ></DragAndDrop>
      <div className="relative overflow-hidden rounded-lg">
        <DragAndDropContext
          replace={handleItemsUpdate}
          items={items}
          renderItem={(item) => (
            <SortableItem
              key={item.uuid}
              index={item.id as string}
              item={item}
              progress={
                progress.find((p) => p.uuid === item.uuid)?.progress as number
              }
              remove={remove}
            ></SortableItem>
          )}
        ></DragAndDropContext>
      </div>
    </div>
  );
};

export default MultiImageUpload;
