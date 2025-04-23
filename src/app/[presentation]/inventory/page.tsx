import ClassfiedList from "@/components/Inventory/ClassfiedList";
import { AwaitedPageProps, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import React from "react";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({
    include: {
      images: true,
    },
  });
};

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;

  const classifieds = await getInventory(searchParams);
  // console.log(classifieds);
  const count = await prisma.classified.count();

  return (
    <div className=" grid grid-cols-1">
      <h1>heool</h1>
      <h1>{count}</h1>
      <h1>{classifieds.length}</h1>
      <ClassfiedList classifieds={classifieds}></ClassfiedList>
    </div>
  );
};

export default page;
