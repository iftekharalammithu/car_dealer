"use client";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { ClassifiedImages } from "./MultiImageUpload";
import { Max_Image, MAX_IMAGE_SIZE } from "@/config/constants";

interface DragAndDropProps {
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  items: ClassifiedImages;
  setFile: (validDile: File[]) => void;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { isUploading, setIsUploading, items, setFile } = props;
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [fileRejected, setFilesRefected] = useState<string[]>([]);
  const [isError, setIsError] = useState({ status: false, message: "" });

  const clearError = useCallback(() => {
    setIsError({ status: false, message: "" });
  }, []);

  const handleFileRejected = useCallback((fileSizeTooBig: string[]) => {
    if (fileSizeTooBig.length) {
      setFilesRefected((prev) => [...prev, ...fileSizeTooBig]);
    }
  }, []);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearError();
    setFilesRefected([]);
    if (e.target.files && e.target.files.length > 0) {
      if (Max_Image < e.target.files.length + items.length) {
        setIsError({
          status: true,
          message: `You can only upload Maximum ${Max_Image} Images `,
        });
        return;
      }
      const fileSizeTooBig = Array.from(e.target.files)
        .filter((file) => file.size > MAX_IMAGE_SIZE)
        .map((file) => file.name);

      handleFileRejected(fileSizeTooBig);

      const validfiles = Array.from(e.target.files).filter(
        (file) => file.size <= MAX_IMAGE_SIZE
      );
      if (validfiles.length) {
        setIsUploading(true);
        setFile(validfiles);
      }
    }
  };
  const handleClick = () => inputRef.current?.click();
  const handleDrop = (e: DragEvent) => {};
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return <div> </div>;
};

export default DragAndDrop;
