"use server";

import {
  CreateCustomerSchema,
  CreateCustomerType,
  UpdateCustomerSchema,
} from "@/app/schemas/Customer.Schema";
import { routes } from "@/config/route";
import prisma from "@/lib/prismadb";
import { CustomerStatus } from "@prisma/client";
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

export const updateCustomerAction = async ({
  id,
  status,
}: {
  id: string;
  status: CustomerStatus;
}) => {
  try {
    const validProps = UpdateCustomerSchema.safeParse({ id, status });
    if (!validProps.success) {
      return { success: false, message: "Invalid Data" };
    }
    const customer = await prisma.customer.findUnique({
      where: {
        id: validProps.data?.id,
      },
    });
    if (!customer) {
      return { success: false, message: "Customer Not Found" };
    }
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        status: validProps.data.status,
        lifeCycles: {
          create: {
            oldStatus: customer.status,
            newStatus: validProps.data.status,
          },
        },
      },
    });

    revalidatePath(routes.admin.editCustomer(customer.id));
    revalidatePath(routes.admin.customers);
    return { success: true, message: "Customer Update Successfully" };
  } catch (error) {
    console.log("Error in Customer Update action", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went Wrong!" };
  }
};
