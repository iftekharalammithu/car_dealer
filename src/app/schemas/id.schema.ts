import { z } from "zod";

export const validateIdSchema = z.object({ classifiedId: z.string() });
