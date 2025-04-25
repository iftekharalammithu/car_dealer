import ClassfiedList from "@/components/Inventory/ClassfiedList";
import CustomPagination from "@/components/shared/CustomPagination";
import { CLASSIFIED_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/route";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
import React from "react";
import { z } from "zod";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = z
    .string()
    .transform((value) => Math.max(Number(value), 1))
    .optional()
    .parse(searchParams?.page);

  const page = validPage ? validPage : 1;
  const offset = (page - 1) * CLASSIFIED_PER_PAGE;

  return prisma.classified.findMany({
    where: {},
    include: {
      images: { take: 1 },
    },
    skip: offset,
    take: CLASSIFIED_PER_PAGE,
  });
};

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  console.log(searchParams);

  const classifieds = await getInventory(searchParams);
  // console.log(classifieds);
  const count = await prisma.classified.count({
    where: {},
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIED_PER_PAGE);

  return (
    <div className="  flex">
      {/* <Sidebar></Sidebar> */}
      <div className=" flex-1 p-4 bg-white">
        <div className=" flex space-y-2 flex-col  items-center justify-between pb-4 -mt-1">
          <div className=" flex justify-between items-center w-full">
            <h2 className=" text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              We Have Found {count} Classifieds
            </h2>
            {/* <DialogFilters></DialogFilters> */}
          </div>
          <CustomPagination
            styles={{
              paginationRoot: "hidden xl:flex justify-end",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border-none active:border text-black",
              paginationLinkActive: "",
            }}
            baseURL={routes.inventory}
            totalPages={totalPages}
            // maxVisiblePages={5}
          ></CustomPagination>
          <ClassfiedList
            classifieds={classifieds}
            favourites={favourites ? favourites.ids : []}
          ></ClassfiedList>
        </div>
      </div>
    </div>
  );
};

export default page;
