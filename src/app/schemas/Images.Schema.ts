import { z } from "zod";
import { zfd } from "zod-form-data";

export const SingleImageSchema = z.object({
  image: z.string(),
});

export type SingleImageType = z.infer<typeof SingleImageSchema>;

export const singleImageUploadSchema = zfd.formData({
  file: zfd.file(),
});
