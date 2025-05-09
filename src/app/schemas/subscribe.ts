import { z } from "zod";

export const subscribeSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }),
  lastName: z.string().min(1, { message: "Last Name is Required" }),
  email: z.string().email({ message: "Invalid email Address!" }),
});
