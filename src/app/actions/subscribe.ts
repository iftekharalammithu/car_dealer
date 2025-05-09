"use server";
import { CustomerStatus } from "@prisma/client";
import { subscribeSchema } from "@/app/schemas/subscribe";
import prisma from "@/lib/prismadb";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const subscribeAction = async (_: any, formData: FormData) => {
  try {
    const { data, success, error } = subscribeSchema.safeParse({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
    });

    if (!success) {
      return { success: false, message: error.message };
    }
    const subscribe = await prisma.customer.findFirst({
      where: { email: data.email },
    });
    if (subscribe) {
      return { success: true, message: "You are already subscribed!" };
    }

    await prisma.customer.create({
      data: {
        ...data,
        status: CustomerStatus.SUBSCRIBER,
      },
    });

    return { success: true, message: "Subscribe Successfully" };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: false, message: error.message };
    }
    if (error instanceof PrismaClientValidationError) {
      return { success: false, message: error.message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something Went Wrong!" };
  }
};
