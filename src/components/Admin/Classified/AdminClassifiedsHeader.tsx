import Radio from "@/components/shared/Radio";
import { AwaitedPageProps } from "@/config/types";
import { ClassifiedStatus } from "@prisma/client";
import React from "react";
import CreateClassifiedDialog from "./CreateClassifiedDialog";

const AdminClassifiedsHeader = ({ searchParams }: AwaitedPageProps) => {
  // console.log(ClassifiedStatus);
  return (
    <div className=" flex  flex-col p-6 space-y-4 text-muted">
      <div className="flex items-center justify-between">
        <h1 className=" font-semibold text-lg md:text-2xl">All Classified</h1>
        <div className=" flex items-center justify-between">
          <Radio
            items={["All", ...Object.values(ClassifiedStatus)]}
            searchParams={searchParams}
          ></Radio>
          <CreateClassifiedDialog></CreateClassifiedDialog>
        </div>
      </div>
    </div>
  );
};

export default AdminClassifiedsHeader;
