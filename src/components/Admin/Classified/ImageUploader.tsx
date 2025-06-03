"use client";
import { MAX_IMAGE_SIZE } from "@/config/constants";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";
import { cn, convertToMb } from "@/lib/utils";
import React, { ChangeEvent, DragEvent, useRef, useState } from "react";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const { oonUploadComplete } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpload, setisUpload] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragover, setdraggover] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      seterror(`File Size Exceeds ${convertToMb(file.size)} limits`);
      return;
    }
    seterror(null);
    setisUpload(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post<{ url: string }>(
        endpoints.images.singleUpload,
        {
          body: formData,
        }
      );
      const { url } = response;
      oonUploadComplete(url);
      setUploadComplete(true);
    } catch (error) {
      console.log("Error Uploading File", error);
      seterror("Failed to upload imnage. Please try again");
    } finally {
      setisUpload(false);
    }
  };
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setdraggover(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      seterror(`File Size Exceeds ${convertToMb(file.size)} limits`);
      return;
    }
    seterror(null);
    setisUpload(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post<{ url: string }>(
        endpoints.images.singleUpload,
        {
          body: formData,
        }
      );
      const { url } = response;
      oonUploadComplete(url);
      setUploadComplete(true);
    } catch (error) {
      console.log("Error Uploading File", error);
      seterror("Failed to upload imnage. Please try again");
    } finally {
      setisUpload(false);
    }
  };

  const stopEvent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    stopEvent(e);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    stopEvent(e);
    setdraggover(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    stopEvent(e);
    setdraggover(true);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div className=" w-full mx-auto">
      <div
        onDrop={handleDrop}
        onClick={handleClick}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onKeyDown={() => null}
        className={cn(
          "relative flex aspect-3/2 cursor-pointer flex-col items-center justify-center rounded-lg",
          error && "border-red-500 border-2 border-dotted",
          isUpload && "pointer-events-none opacity-50",
          dragover && "opacity-50",
          !uploadComplete && "border-2 border-dashed border-gray-300"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled
        ></input>
      </div>
    </div>
  );
};

export default ImageUploader;
