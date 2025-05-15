"use client";
import { MultiStapFormEnum, MultiStepFormComponentProps } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { formatDate } from "@/lib/utils";
import {
  SubmitDetailsSchema,
  SubmitDetailsSchemaType,
} from "@/app/schemas/Customer.Schema";
import { createCustomerAction } from "@/actions/customer";
import { toast } from "sonner";
import { routes } from "@/config/route";

const SubmitDetails = (props: MultiStepFormComponentProps) => {
  const { params, searchParams } = props;
  const router = useRouter();
  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      terms: "false",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set("step", MultiStapFormEnum.SELECT_DATE.toString());
      console.log(url.toString());
      router.push(url.toString());
    });
  };

  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      const handoverDate = decodeURIComponent(
        searchParams?.handoverDate as string
      );
      const handoverTime = decodeURIComponent(
        searchParams?.handoverTime as string
      );
      // console.log(handoverDate, handoverTime);
      const date = formatDate(handoverDate, handoverTime);
      // console.log(date);

      const { success, message } = await createCustomerAction({
        slug: params?.slug as string,
        date,
        ...data,
      });
      if (!success) {
        toast.error("Error", { description: message });
        return;
      }
      toast.success("Success", { description: message });

      setTimeout(() => {
        router.push(routes.success(params?.slug as string));
      }, 1000);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitDetails)}
        className=" mx-auto bg-white flex flex-col rounded-b-lg shadow-lg p-6 h-96"
      >
        <div className="space-y-6 flex-1">
          <div className=" grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">Enter First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your First Name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Enter Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Last Name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Enter Your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="mobile">Enter Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Mobile" {...field}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field: { ref, onChange, ...rest } }) => (
                <FormItem className=" flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      className=" cursor-pointer m-0"
                      onCheckedChange={(e) => onChange(e ? "true" : "false")}
                      {...rest}
                    ></Checkbox>
                  </FormControl>
                  <FormLabel
                    htmlFor="terms"
                    className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 !mt-0"
                  >
                    I agree to the terms and conditions
                  </FormLabel>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <div className=" flex gap-x-4 ">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isPrevPending}
            className=" uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPrevPending ? (
              <Loader2 className=" w-4 h-4 shrink-0 animate-spin"></Loader2>
            ) : null}
            Previous Step
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className=" uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPending ? (
              <Loader2 className=" w-4 h-4 shrink-0 animate-spin"></Loader2>
            ) : null}
            Submit Details
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmitDetails;
