import { ClassifiedStatus } from "@prisma/client";
import { z } from "zod";

export const AdminClassifiedFileterSchema = z.object({
  q: z.string().optional(),
  status: z
    .enum(["ALL", ...Object.values(ClassifiedStatus)])
    .default("ALL")
    .optional(),
});
