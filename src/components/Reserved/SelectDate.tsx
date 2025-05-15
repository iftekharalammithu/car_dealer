"use client";
import { MultiStapFormEnum, MultiStepFormComponentProps } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Select from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { routes } from "@/config/route";
import { generateDateOptions, generateTimeOptions } from "@/lib/utils";
import { SelectDataSchema, SelectDateType } from "@/app/schemas/form.schema";

const SelectDate = (props: MultiStepFormComponentProps) => {
  const { searchParams } = props;
  const handoverDate = (searchParams?.handoverDate as string) ?? undefined;
  const handoverTime = (searchParams?.handoverTime as string) ?? undefined;

  const form = useForm<SelectDateType>({
    resolver: zodResolver(SelectDataSchema),
    mode: "onBlur",
    defaultValues: {
      handoverDate: handoverDate
        ? decodeURIComponent(handoverDate)
        : handoverDate,
      handoverTime: handoverTime
        ? decodeURIComponent(handoverTime)
        : handoverTime,
    },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set("step", MultiStapFormEnum.WELCOME.toString());
      // console.log(url.toString());
      router.push(url.toString());
    });
  };

  const onSelectDate: SubmitHandler<SelectDateType> = (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(
        routes.reserve(props.classified.slug, MultiStapFormEnum.SUBMIT_DETAILS),
        process.env.NEXT_PUBLIC_APP_URL
      );
      url.searchParams.set(
        "handoverDate",
        encodeURIComponent(data.handoverDate)
      );
      url.searchParams.set(
        "handoverTime",
        encodeURIComponent(data.handoverTime)
      );
      router.push(url.toString());
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSelectDate)}
        className=" mx-auto bg-white flex flex-col rounded-b-lg shadow-lg p-6 h-96"
      >
        <div className="space-y-0 flex-1">
          <FormField
            control={form.control}
            name="handoverDate"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverDate">Select a Date</FormLabel>
                <FormControl>
                  <Select options={generateDateOptions()} {...rest}></Select>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="handoverTime"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverTime">Select A Time</FormLabel>
                <FormControl>
                  <Select options={generateTimeOptions()} {...rest}></Select>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
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
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SelectDate;
