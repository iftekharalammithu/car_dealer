"use client";
import { routes } from "@/config/route";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ClassifiedWithImages, MultiStapFormEnum } from "@/config/types";
import { HTMLParser } from "../shared/html_parser";
import { CircleGauge, Cog, Fuel, Paintbrush2 } from "lucide-react";
import { Button } from "../ui/button";
import Favourite_button from "./favourite_button";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/utils";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favourites: string[];
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <CircleGauge className=" w-4 h-4"></CircleGauge>,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(
        classified.odoUnit
      )}`,
    },
    {
      id: "transmission",
      icon: <Cog className=" w-4 h-4"></Cog>,
      value: formatTransmission(classified.transmission),
    },
    {
      id: "fuelType",
      icon: <Fuel className=" w-4 h-4"></Fuel>,
      value: formatFuelType(classified.fuelType),
    },
    {
      id: "color",
      icon: <Paintbrush2 className=" w-4 h-4"></Paintbrush2>,
      value: formatColor(classified.color),
    },
  ];
};

const Classified_card = ({ classified, favourites }: ClassifiedCardProps) => {
  const pathname = usePathname();

  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id)
  );

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    if (!isFavourite && pathname === routes.favorites) {
      setVisible(false);
    }
  }, [isFavourite, pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white relative  rounded-md shadow-md overflow-hidden flex flex-col"
        >
          <div className="w-full h-64 relative">
            <Link href={routes.singleClassified(classified.slug)}>
              <Image
                placeholder="blur"
                blurDataURL={classified.images[0].blurhash}
                src={classified.images[0].src}
                alt={classified.images[0].alt}
                className="object-cover w-full h-full"
                loading="lazy"
                quality={25}
                width={1920}
                height={1200}
              />
            </Link>
            <Favourite_button
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite}
              classifiedId={classified.id}
            ></Favourite_button>
            <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 rounded font-bold px-2 py-1">
              <p className="text-xs lg:text-base xl:text-lg font-semibold">
                {formatPrice({
                  price: classified.price,
                  currency: classified.currency,
                })}
              </p>
            </div>
          </div>
          <div className="p-4 flex  flex-col space-y-3 ">
            <div>
              <Link
                className=" text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition  hover:text-primary"
                href={routes.singleClassified(classified.slug)}
              >
                {classified.title}
              </Link>
              {classified?.description && (
                <div className=" text-xs md:text-sm xl:text-base text-gray-500 line-clamp-2">
                  <HTMLParser html={classified.description}></HTMLParser>
                </div>
              )}
              <ul className=" text-xs md:text-sm text-gray-500  xl:flex grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full">
                {getKeyClassifiedInfo(classified)
                  .filter((item) => item.value)
                  .map(({ id, icon, value }) => (
                    <li
                      key={id}
                      className=" font-semibold flex xl:flex-col items-center gap-x-1.5"
                    >
                      {icon} {value}
                    </li>
                  ))}
              </ul>
            </div>
            <div className=" mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2  w-full">
              <Button
                className=" flex-1 transition-colors hover:bg-primary hover:border-white hover:text-white py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                asChild
                variant={"outline"}
                size={"sm"}
              >
                <Link
                  href={routes.reserve(
                    classified.slug,
                    MultiStapFormEnum.WELCOME
                  )}
                >
                  Reserve
                </Link>
              </Button>
              <Button
                className=" flex-1 py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                asChild
                size={"sm"}
              >
                <Link href={routes.singleClassified(classified.slug)}>
                  view Details
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Classified_card;
