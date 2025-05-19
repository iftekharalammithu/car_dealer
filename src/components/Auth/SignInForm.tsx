"use client";
import { routes } from "@/config/route";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { CircleCheckIcon, Loader2 } from "lucide-react";

const SubmitButton = () => {
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
        Sign In
      </Button>
    </>
  );
};

const SignInForm = () => {
  const [state, formAction] = useActionState(null, {
    success: false,
    message: "",
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      router.refresh();
      router.push(routes.challenge);
    }
  }, [state, router]);
  return (
    <div className=" flex flex-col items-center  justify-center bg-white min-h-[calc(100vh-4rem)]">
      <div className=" max-w-md w-full pb-60">
        <form
          action={formAction}
          ref={formRef}
          className=" border-muted border shadow-lg p-10 rounded-md bg-white"
        >
          <div className=" flex text-center mb-6 justify-center">
            <h2 className=" uppercase text-2xl font-bold ">Admin Sign In</h2>
          </div>
          <div className=" space-y-4">
            <div className=" space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className=" placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Your Admin Email"
                required
              ></Input>
            </div>
            <div className=" space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className=" placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Enter Your Admin Email"
                required
              ></Input>
            </div>
            <div className=" my-6">
              <p className=" text-sm text-gray-600 mb-2 text-center">
                <b>This is for admin only</b>
              </p>
            </div>
            <div className=" space-y-4">
              <SubmitButton />
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
