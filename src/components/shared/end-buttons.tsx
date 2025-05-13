import { routes } from "@/config/route";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const EndButton = () => {
  return (
    <div>
      <div className=" mt-6 flex items-center justify-center gap-4">
        <Button
          className=" transition-colors hover:border-white hover:bg-primary hover:text-white"
          variant={"outline"}
          asChild
        >
          <Link href={routes.home}>
            <HomeIcon className=" mr-2 h-5 w-5"></HomeIcon>
            Go to Homepage
          </Link>
        </Button>
        <Button
          className=" transition-colors hover:border-white hover:bg-primary hover:text-white"
          variant={"outline"}
          asChild
        >
          <Link href={routes.inventory}>
            <HomeIcon className=" mr-2 h-5 w-5"></HomeIcon>
            View Classified
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EndButton;
