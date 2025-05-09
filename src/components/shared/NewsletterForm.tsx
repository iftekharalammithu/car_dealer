"use client";
import { subscribeAction } from "@/app/actions/subscribe";
import { subscribeSchema } from "@/app/schemas/subscribe";
import React, { useActionState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

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
        </form>
      </Form>
    </div>
  );
};

export default NewsletterForm;
