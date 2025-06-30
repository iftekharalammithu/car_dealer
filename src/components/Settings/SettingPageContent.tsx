"use client";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { logoutOfAllSession } from "@/actions/LogoutAllSeasons";

const LogoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className=" mt-8 flex">
      <Button
        disabled={pending}
        className=" flex items-center gap-x-2"
        variant={"destructive"}
        type="submit"
      >
        {pending && <Loader2 className=" h-4 w-4 animate-spin"></Loader2>}
        {pending ? "Logging Out..." : "Log Out of all session "}
      </Button>
    </div>
  );
};
const SettingPageContent = () => {
  const [_, formaAction] = useActionState(logoutOfAllSession, null);
  return (
    <div className=" divide-y divide-white/5 px-6">
      <div className=" grid max-w-7xl grid-cols-1  gap-x-8 md:grid-cols-3">
        <div>
          <h2 className=" text-base font-semibold leading-7 text-muted">
            Log out of All Sessions
          </h2>
          <p className=" mt-1 text-sm leading-6 text-muted">
            This will log out of all of your sessions across all of your devices
            of which you are currently logged into
          </p>
        </div>
        <form action={formaAction} className="  md:col-span-2">
          <LogoutButton></LogoutButton>
        </form>
      </div>
    </div>
  );
};

export default SettingPageContent;
