"use client";
import { OneTimePasswordSchema, OtpSchematype } from "@/app/schemas/Otp.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { OneTimePasswordInput } from "./OtpInput";
import { Loader2, RotateCw } from "lucide-react";
import {
  completeChallangeAction,
  resendChallangeAction,
} from "@/actions/Challange";
import { toast } from "sonner";
import { routes } from "@/config/route";
import { Button } from "../ui/button";

const OtpForm = () => {
  const [isCodePending, startCodeTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const router = useRouter();
  const form = useForm<OtpSchematype>({
    resolver: zodResolver(OneTimePasswordSchema),
  });

  const onSubmit: SubmitHandler<OtpSchematype> = (data) => {
    startSubmitTransition(async () => {
      // console.log(data.code);
      const result = await completeChallangeAction(data.code);
      // console.log(result);
      if (!result?.success) {
        toast.error("Error", { description: result.message });
      } else {
        toast.success("Verified", { description: "OTP Verified" });
        router.push(routes.admin.dashboard);
      }
    });
  };

  const [sendButtonText, setSendButtonText] = useState("Send Code");
  const sendCode = () => {
    startCodeTransition(async () => {
      const { success, message } = await resendChallangeAction();
      setSendButtonText("Resend Code");

      if (!success) {
        toast.error("Error", { description: message });
      }
      toast.success("Code Sent", { description: "Otp Send to Your Email" });
    });
  };

  useEffect(() => {
    if (isCodePending) {
      setSendButtonText("Sending....");
    }
  }, [isCodePending]);

  return (
    <div className=" min-h-[calc(100vh-4rem)]  flex w-full flex-1  justify-center pt-10 px-6 lg:items-center lg:pt-0">
      <div className="flex w-full max-w-lg flex-col">
        <h3 className=" mb-4 text-4xl lg:text-5xl text-center">
          One Time Password
        </h3>
        <p className=" mb-12 text-center text-slate-500">
          Enter the six Digit code sent to your Email
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem className=" mb-8">
                  <FormControl>
                    <OneTimePasswordInput
                      type="number"
                      setValue={onChange}
                      {...rest}
                    ></OneTimePasswordInput>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <div className="flex w-full  items-center justify-center">
              <button
                type="button"
                className=" flex items-center gap-2.5 text-base font-medium text-slate-500 transition-colors cursor-pointer duration-200 hover:text-primary group"
                onClick={sendCode}
                disabled={isCodePending}
              >
                {isCodePending ? (
                  <Loader2 className=" w-6 h-6 text-gray-500 transition-colors duration-200 group-hover:text-primary animate-spin"></Loader2>
                ) : (
                  <RotateCw className=" w-6 h-6 text-gray-500 transition-colors duration-200 group-hover:text-primary "></RotateCw>
                )}
                {sendButtonText}
              </button>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-16">
              <Button
                className=" flex w-full gap-x-2"
                disabled={isSubmitPending}
              >
                <span className=" text-sm uppercase tracking-wider  text-inherit">
                  {isSubmitPending ? "Verifying..." : "Verify"}
                </span>
                {isSubmitPending ? (
                  <Loader2 className=" w-4 h-4 shrink-0 animate-spin"></Loader2>
                ) : null}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OtpForm;
