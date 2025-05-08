import ClassfiedList from "@/components/Inventory/ClassfiedList";
import DialogFilters from "@/components/Inventory/DialogFilters";
import Sidebar from "@/components/Inventory/Sidebar";
import CustomPagination from "@/components/shared/CustomPagination";
import { CLASSIFIED_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/route";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import React from "react";
import { z } from "zod";

const PageSchema = z
  .string()
  .transform((value) => Math.max(Number(value), 1))
  .optional();

const ClassifiedSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  odoUnit: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  door: z.string().optional(),
  seats: z.string().optional(),
  ulezCompliance: z.string().optional(),
  color: z.string().optional(),
});

// This Function Creating a prisma query to search spacific Car Details
const buildClassifiedQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedSchema.safeParse(searchParams);
  if (!data) {
    return { status: ClassifiedStatus.LIVE };
  }
  const keys = Object.keys(data);

  const taxonomiefilters = ["make", "model", "modelVariant"];
  const rangefilter = {
    minYear: "year",
    maxYear: "year",
    minPrice: "price",
    maxPrice: "price",
    minReading: "odoReading",
    maxReading: "odoReading",
  };

  const numFilters = ["seats", "doors"];
  const enulmFilters = [
    "odoUnit",
    "currency",
    "transmission",
    "bodyType",
    "fuelType",
    "color",
    "ulezCompliance",
  ];

  const mapParamsToFields = keys.reduce((acc, key) => {
    const value = searchParams?.[key] as string | undefined;

    if (!value) return acc;

    if (taxonomiefilters.includes(key)) {
      acc[key] = { id: value };
    } else if (enulmFilters.includes(key)) {
      // console.log("Value", value);
      acc[key] = value.toUpperCase();
    } else if (numFilters.includes(key)) {
      acc[key] = Number(value);
    } else if (key in rangefilter) {
      const field = rangefilter[key as keyof typeof rangefilter];
      acc[field] = acc[field] || {};
      if (key.startsWith("min")) {
        acc[field].gte = Number(value);
      } else if (key.startsWith("max")) {
        acc[field].lte = Number(value);
      }
    }
    return acc;
  }, {} as { [key: string]: any });
  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        { title: { contains: searchParams.q as string, mode: "insensitive" } },
        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};

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

  const classifieds = await getInventory(searchParams);
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
        <ClassfiedList
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        ></ClassfiedList>
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
