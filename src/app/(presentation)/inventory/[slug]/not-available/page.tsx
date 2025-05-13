import EndButton from "@/components/shared/end-buttons";
import { XCircle } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className=" flex  flex-col items-center justify-center min-h-[80dvh]">
      <div className=" w-full max-w-lg bg-card rounded-lg shadow-lg">
        <h1 className="  text-center bg-primary text-primary-foreground text-lg font-semibold p-4 rounded-t-lg">
          Vehicle not Available
        </h1>
      </div>
      <div className=" flex flex-col  items-center p-8 space-y-4">
        <XCircle className=" w-16 h-16 text-muted-foreground"></XCircle>
        <p className=" text-lg font-semibold text-center">
          Sorry! that Vehicle is no longer available
        </p>
        <p className=" text-center text-muted-foreground">
          We have a large number of other vehicles that might suit you to view
          our current stock please check our website
        </p>
        <EndButton></EndButton>
      </div>
    </div>
  );
};

export default page;
