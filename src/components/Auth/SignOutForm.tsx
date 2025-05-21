"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { SignOutAction } from "@/actions/SignOut";

const SignOutForm = () => {
  return (
    <div>
      <form action={SignOutAction}>
        <SignOutButton></SignOutButton>
      </form>
    </div>
  );
};

export default SignOutForm;

const SignOutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className=" flex items-center gap-2"
    >
      {pending && <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>}{" "}
      Sign Out
    </Button>
  );
};
