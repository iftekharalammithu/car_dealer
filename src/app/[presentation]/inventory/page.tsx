import ClassfiedList from "@/components/Inventory/ClassfiedList";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
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

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  return (
    <div className=" grid grid-cols-1">
      <h1>heool</h1>
      <h1>{count}</h1>
      <h1>{classifieds.length}</h1>
      <ClassfiedList
        classifieds={classifieds}
        favourites={favourites ? favourites.ids : []}
      ></ClassfiedList>
    </div>
  );
};

export default page;
