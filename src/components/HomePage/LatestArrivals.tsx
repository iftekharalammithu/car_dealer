import React from "react";
import LatestArrivalsCarousel from "./LatestArrivalsCarousel";
import prisma from "@/lib/prismadb";
import { ClassifiedStatus } from "@prisma/client";
import { getSourceId } from "@/lib/source_id";
import { redis } from "@/lib/radis_store";
import { Favourites } from "@/config/types";

const LatestArrivals = async () => {
  const classified = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId || "");
  return (
    <section className=" py-16 sm:py-24">
      <div className=" container mx-auto max-w-[90vw]">
        <h2 className=" mt-2 uppercase text-2xl font-bold tracking-tight sm:text-4xl text-gray-800">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classified}
          favourites={favourites ? favourites.ids : []}
        ></LatestArrivalsCarousel>
      </div>
    </section>
  );
};

export default LatestArrivals;
