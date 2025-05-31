import { z } from "zod";

export const SingleImageSchema = z.object({
  image: z.string().url(),
});

export type SingleImageType = z.infer<typeof SingleImageSchema>;
