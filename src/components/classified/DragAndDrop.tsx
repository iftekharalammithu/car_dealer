"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClassifiedImages } from "./MultiImageUpload";
import { Max_Image, MAX_IMAGE_SIZE } from "@/config/constants";
import { cn, convertToMb } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";

interface DragAndDropProps {
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  items: ClassifiedImages;
  setFile: (validDile: File[]) => void;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { isUploading, setIsUploading, items, setFile } = props;
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileRejected, setFilesRefected] = useState<string[]>([]);
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [isDragingOVer, setdragingover] = useState(false);

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
    e.target.value = "";
  };

  const handleClick = () => inputRef.current?.click();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearError();
    setFilesRefected([]);
    if (e.dataTransfer?.files && e.dataTransfer?.files.length > 0) {
      if (Max_Image < e.dataTransfer?.files.length + items.length) {
        setIsError({
          status: true,
          message: `You can only upload Maximum ${Max_Image} Images `,
        });
        return;
      }
      const fileSizeTooBig = Array.from(e.dataTransfer?.files)
        .filter((file) => file.size > MAX_IMAGE_SIZE)
        .map((file) => file.name);

      handleFileRejected(fileSizeTooBig);

      const validfiles = Array.from(e.dataTransfer?.files).filter(
        (file) => file.size <= MAX_IMAGE_SIZE
      );
      if (validfiles.length) {
        setIsUploading(true);
        setFile(validfiles);
      }
    }
    e.dataTransfer?.clearData();
  };

  const stopEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent) => {
    stopEvent(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    stopEvent(e);
    setdragingover(false);
  };

  const handleDragOver = (e: DragEvent) => {
    stopEvent(e);
    setdragingover(true);
  };

  useEffect(() => {
    const div = dropRef.current;
    if (div) {
      div.addEventListener("drop", handleDrop);
      div.addEventListener("dragover", handleDragOver);
      div.addEventListener("dragleave", handleDragLeave);
      div.addEventListener("dragenter", handleDragEnter);
    }
    return () => {
      if (div) {
        div.removeEventListener("drop", handleDrop);
        div.removeEventListener("dragover", handleDragOver);
        div.removeEventListener("dragleave", handleDragLeave);
        div.removeEventListener("dragenter", handleDragEnter);
      }
    };
  }, []);

  useEffect(() => {
    if (fileRejected.length) {
      setIsError({
        status: true,
        message: `${fileRejected.length} image ${fileRejected.length > 1 ? "s" : ""} exceeded ${convertToMb(MAX_IMAGE_SIZE)} limit`,
      });
    }
  }, [fileRejected]);

  return (
    <div>
      <div
        ref={dropRef}
        className={cn(
          "relative  flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted/75",
          isError.status && "border-red-500",
          isUploading && "pointer-events-none"
        )}
      >
        <input
          type="file"
          disabled={isUploading}
          multiple={true}
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        <div
          className={cn(
            " flex w-full h-full flex-col items-center justify-center text-center font-medium",
            isUploading || (isDragingOVer && " opacity-75")
          )}
          onKeyDown={handleClick}
        >
          <ImagePlus className=" mx-auto mb-3 h-auto w-9 text-gray-400"></ImagePlus>
          <p className=" mb-1">
            <span className=" text-primary">Upload Files</span>
            <span className=" ml-1 text-muted/75">Drag and Drop</span>
          </p>
          <p className=" text-sm text-muted/75">
            PNG, JPG, WEBP up to {convertToMb(MAX_IMAGE_SIZE)} each
          </p>
        </div>
        {isUploading && (
          <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacirt-50">
            <Loader2 className=" h-6 w-6 animate-spin"></Loader2>
          </div>
        )}
      </div>
      {isError.status && (
        <div className=" flex w-full flex-wrap justify-baseline md:mt-3">
          <div className=" text-sm font-medium text-red-500">
            {isError.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
