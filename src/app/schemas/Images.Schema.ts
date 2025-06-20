import { z } from "zod";
import { zfd } from "zod-form-data";

export const SingleImageSchema = z.object({
  image: z.string(),
});

export type SingleImageType = z.infer<typeof SingleImageSchema>;

export const singleImageUploadSchema = zfd.formData({
  file: zfd.file(),
});

export const InitialiseMultiparUploadSchema = z.object({
  name: z.string(),
  uuid: z.string(),
});

export const GetMultiparUploadSchema = z.object({
  fileKey: z.string(),
  fileId: z.string(),
  parts: z.number(),
});

export const FinaliseMultiparUploadSchema = z.object({
  fileKey: z.string(),
  fileId: z.string(),
  parts: z.array(z.object({ ParsNumber: z.number(), ETag: z.string() })),
});
