import { z } from "zod";

export const validateIdSchema = z.object({ classifiedId: z.string() });
export const validateIDSchema2 = z.object({ id: z.string() });
