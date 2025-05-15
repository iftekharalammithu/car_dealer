import { MultiStapFormEnum } from "@/config/types";
import { z } from "zod";

export const MultiStepFormSchema = z.object({
  step: z.nativeEnum(MultiStapFormEnum),
  slug: z.string(),
});

export const SelectDataSchema = z.object({
  handoverDate: z.string({ message: "Handover Date is Required" }),
  handoverTime: z.string({ message: "Handover Time is Required" }),
});

export type SelectDateType = z.infer<typeof SelectDataSchema>;
