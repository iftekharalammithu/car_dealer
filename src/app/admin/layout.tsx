import { Ai } from "@/actions/ai";
import AdminHeader from "@/components/layouts/AdminHeader";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <Ai>
      <div className=" flex bg-primary-900 min-h-screen w-full">
        <AdminSidebar></AdminSidebar>
        <div className=" flex flex-col flex-1 overflow-hidden">
          <AdminHeader></AdminHeader>
          <main className=" admin-scrollbar flex flex-1 flex-col gap-4  p-4 md:p-6 overflow-auto md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </Ai>
  );
};

export default layout;
