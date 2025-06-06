"use client";
import { subscribeAction } from "@/actions/subscribe";
import { subscribeSchema } from "@/app/schemas/subscribe";
import React, { useActionState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleCheckIcon, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubscribeButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        disabled={pending}
        className=" w-full uppercase font-bold"
        type="submit"
      >
        {pending && (
          <Loader2
            className=" h-4 w-4 shrink-0 animate-spin"
            aria-hidden="true"
          ></Loader2>
        )}{" "}
        Subscribe Now
      </Button>
    </>
  );
};

const NewsletterForm = () => {
  const [state, formAction] = useActionState(subscribeAction, {
    success: false,
    message: "",
  });
  const form = useForm({
    resolver: zodResolver(subscribeSchema),
    mode: "onChange",
  });

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger();
    if (!valid) {
      return;
    }
    formAction(formData);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <div className=" space-y-4">
      <h3 className=" text-xl font-bold text-primary">
        Subscribe to our inventory updates
      </h3>
      <p className=" text-gray-700">
        Exter your details to receive new stock update
      </p>
      <Form {...form}>
        <form
          ref={formRef}
          className=" space-y-2"
          action={handleFormAction}
          onSubmit={() => null}
        >
          <div className=" grid grid-cols-2 space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      className=" bg-white w-full"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      className=" bg-white w-full"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className=" bg-white w-full"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
          <SubscribeButton />

          {state.success && (
            <div className=" flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
              <CircleCheckIcon className=" h-5 w-5"></CircleCheckIcon>
              <span>Success! {state.message}</span>
            </div>
          )}
          {!state.success && state.message && (
            <div className=" flex items-center gap-2 rounded-md bg-gray-500 p-3 text-white">
              <CircleCheckIcon className=" h-5 w-5"></CircleCheckIcon>
              <span>Error! {state.message}</span>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default NewsletterForm;
