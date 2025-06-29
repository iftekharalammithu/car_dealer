"use server";

import {
  CreateCustomerSchema,
  CreateCustomerType,
} from "@/app/schemas/Customer.Schema";
import { routes } from "@/config/route";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

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
    return { success: true, message: "Successfully Car Reserved" };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteCustomerAction = async (id: string) => {
  try {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
    revalidatePath(routes.admin.classifieds);
    return { success: true, message: "Customer Deleted" };
  } catch (error) {
    console.log("Error Deleting Customer:", { error });
    return { success: false, message: "Customer Delete Failed" };
  }
};
