import { PageSchema } from "@/app/schemas/Page.Schema";
import ClassfiedList from "@/components/Inventory/ClassfiedList";
import DialogFilters from "@/components/Inventory/DialogFilters";
import InventorySkeleton from "@/components/Inventory/InventorySkeleton";
import Sidebar from "@/components/Inventory/Sidebar";
import CustomPagination from "@/components/shared/CustomPagination";
import { CLASSIFIED_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/route";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
import { buildClassifiedQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import React, { Suspense } from "react";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);

  const page = validPage ? validPage : 1;
  const offset = (page - 1) * CLASSIFIED_PER_PAGE;

  // console.log(buildClassifiedQuery(searchParams));

  return prisma.classified.findMany({
    where: buildClassifiedQuery(searchParams),
    include: {
      images: { take: 1 },
    },
    skip: offset,
    take: CLASSIFIED_PER_PAGE,
  });
};

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  // console.log("Search Params", searchParams);

  const classifieds =  getInventory(searchParams);
  // console.log("Classifieds==>", classifieds);
  const count = await prisma.classified.count({
    where: buildClassifiedQuery(searchParams),
  });

  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIED_PER_PAGE);

  return (
    <div className="  flex">
      <Sidebar
        minMaxValues={minMaxResult}
        searchParams={searchParams}
      ></Sidebar>
      <div className=" flex-1 p-4 bg-white">
        <div className=" flex space-y-2 flex-col  items-center justify-between pb-4 -mt-1">
          <div className=" flex justify-between items-center w-full">
            <h2 className=" text-sm md:text-base  lg:text-xl font-semibold min-w-fit">
              We Have Found {count} Classifieds
            </h2>
            <DialogFilters
              minMaxValues={minMaxResult}
              count={count}
              searchParams={searchParams}
            ></DialogFilters>
          </div>
          <CustomPagination
            styles={{
              paginationRoot: "hidden  justify-end  lg:flex",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border-none active:border text-black",
              paginationLinkActive: "",
            }}
            baseURL={routes.inventory}
            totalPages={totalPages}
            // maxVisiblePages={5}
          ></CustomPagination>
        </div>
        <Suspense fallback={<InventorySkeleton />}>
          <ClassfiedList
            classifieds={classifieds}
            favourites={favourites ? favourites.ids : []}
          ></ClassfiedList>
        </Suspense>
        <CustomPagination
          styles={{
            paginationRoot: "justify-center pt-12 lg:hidden",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border-none active:border",
            paginationLinkActive: "",
          }}
          baseURL={routes.inventory}
          totalPages={totalPages}
          // maxVisiblePages={5}
        ></CustomPagination>
      </div>
    </div>
  );
};

export default page;
