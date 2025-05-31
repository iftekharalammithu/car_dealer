"use client";
import { MAX_IMAGE_SIZE } from "@/config/constants";
import { convertToMb } from "@/lib/utils";
import React, { ChangeEvent, useRef, useState } from "react";

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
    } catch (error) {
      console.log("Error Uploading File", error);
      seterror("Failed to upload imnage. Please try again");
    } finally {
      setisUpload(false);
    }
  };
  return <div></div>;
};

export default ImageUploader;
