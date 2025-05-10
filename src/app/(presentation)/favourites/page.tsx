import { PageSchema } from "@/app/schemas/Page.Schema";
import { CLASSIFIED_PER_PAGE } from "@/config/constants";
import { Favourites, PageProps } from "@/config/types";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
import React from "react";
import prisma from "@/lib/prismadb";
import Classified_card from "@/components/Inventory/Classified_card";
import CustomPagination from "@/components/shared/CustomPagination";
import { routes } from "@/config/route";

const FavouritesPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  // console.log("Search Params", searchParams);
  const validPage = PageSchema.parse(searchParams?.page);

  const page = validPage ? validPage : 1;
  const offset = (page - 1) * CLASSIFIED_PER_PAGE;

  // console.log(buildClassifiedQuery(searchParams));
  const sourceId = await getSourceId();
  // console.log(sourceId);

  const favourites = await redis.get<Favourites>(sourceId ?? "");

  const classfieds = await prisma.classified.findMany({
    where: { id: { in: favourites ? favourites.ids : [] } },
    include: {
      images: { take: 1 },
    },
    skip: offset,
    take: CLASSIFIED_PER_PAGE,
  });

  // console.log("Classifieds==>", classifieds);
  const count = await prisma.classified.count({
    where: { id: { in: favourites ? favourites.ids : [] } },
  });

  const totalPages = Math.ceil(count / CLASSIFIED_PER_PAGE);

  return (
    <div className=" container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className=" text-3xl font-bold mb-6">Your Favourite Classifieds</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {classfieds.map((classfied) => {
          return (
            <Classified_card
              key={classfied.id}
              classified={classfied}
              favourites={favourites ? favourites.ids : []}
            ></Classified_card>
          );
        })}
      </div>
      <div className=" mt-8 flex">
        <CustomPagination
          baseURL={routes.favorites}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-center",
            paginationPrevious: "",
            paginationNext: "",
            paginationLinkActive: "",
            paginationLink: "border-none active-border",
          }}
        ></CustomPagination>
      </div>
    </div>
  );
};

export default FavouritesPage;
