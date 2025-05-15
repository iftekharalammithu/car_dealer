"use server";

import {
  CreateCustomerSchema,
  CreateCustomerType,
} from "@/app/schemas/Customer.Schema";
import prisma from "@/lib/prismadb";

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { data, success, error } = CreateCustomerSchema.safeParse(props);
    // console.log("data", data);
    if (!success) {
      console.log(error);
      return { success: false, message: "Invalid data" };
    }
    if (data.terms !== "true") {
      return { success: false, message: "You must accept the terms" };
    }

    const { date, terms, slug, ...rest } = data;
    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: date,
        termsAccepted: terms === "true",
        classfied: { connect: { slug } },
      },
    });
    return {success: true , message: "Successfully Car Reserved"}
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};
