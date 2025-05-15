import { z } from "zod";

export const SubmitDetailsSchema = z.object({
  firstName: z.string({ message: "First Name is Required" }),
  lastName: z.string({ message: "Last Name is Required" }),
  email: z.string({ message: "Email is Required" }),
  mobile: z.string({ message: "Mobile is Required" }),
  terms: z.enum(["true", "false"], {
    message: "You must agree to the terms and conditions",
  }),
});

export type SubmitDetailsSchemaType = z.infer<typeof SubmitDetailsSchema>;

export const CreateCustomerSchema = SubmitDetailsSchema.extend({
  date: z.date(),
  slug: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
