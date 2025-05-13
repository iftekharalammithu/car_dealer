import { AwaitedPageProps } from "@/config/types";
import React from "react";
import HomePageFilters from "./HomePageFilters";
import SearchButton from "./SearchButton";
import prisma from "@/lib/prismadb";
import { buildClassifiedQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { routes } from "@/config/route";
import Link from "next/link";
import { ClassifiedStatus } from "@prisma/client";

const HeroSection = async (props: AwaitedPageProps) => {
  const { searchParams } = props;
  const totalFilterApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFilterApplied > 0;
  const classifiedCount = await prisma.classified.count({
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
  return (
    <div>
      <section
        className=" relative flex items-center justify-center h-[calc(100vh-4rem)] inset-0 bg-cover bg-center  "
        style={{
          backgroundImage:
            "url('/lamborghini_aventador_lp7504_108049_1920x1080.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 opacity-75"></div>
        <div className="  container lg:grid space-y-12 gap-4 grid-cols-2 items-center relative z-10">
          <div className=" px-10 lg:px-0">
            <h1 className=" text-2xl text-center lg:text-left md:text-4xl lg:text-8xl uppercase font-extrabold text-white">
              Unbeatable Deals on New & Used Cars
            </h1>
            <h2 className=" mt-4 uppercase text-center lg:text-left text-base md:text-3xl lg:text-4xl text-white">
              Discover your dream car today
            </h2>
          </div>
          <div className=" max-w-md   p-6 bg-white sm:rounded-xl shadow-2xl">
            <div className=" space-y-4">
              <div className=" space-y-2 flex flex-col w-full gap-x-4">
                <HomePageFilters
                  minMaxValues={minMaxResult}
                  searchParams={searchParams}
                ></HomePageFilters>
              </div>
              <SearchButton count={classifiedCount}></SearchButton>
              {isFilterApplied && (
                <Button
                  asChild
                  variant={"outline"}
                  className=" hover:bg-slate-200 w-full"
                >
                  <Link href={routes.home}>
                    Clear Filters ({totalFilterApplied})
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
