import { ClassifiedStatus, CustomerStatus } from "@prisma/client";
import { z } from "zod";

export const AdminClassifiedFileterSchema = z.object({
  q: z.string().optional(),
  status: z
    .enum(["ALL", ...Object.values(ClassifiedStatus)])
    .default("ALL")
    .optional(),
});

export const AdminCustomerFileterSchema = z.object({
  q: z.string().optional(),
  status: z
    .enum(["ALL", ...Object.values(CustomerStatus)])
    .default("ALL")
    .optional(),
});
