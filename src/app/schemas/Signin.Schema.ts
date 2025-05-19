import { z } from "zod";

export const SignSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Please enter a valid email a" })
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is Required" })
    .min(1, { message: "Password Required" })
    .min(8, "Password must be more than 8 Character")
    .max(32, { message: "Password must be less than 32 Character" }),
});
