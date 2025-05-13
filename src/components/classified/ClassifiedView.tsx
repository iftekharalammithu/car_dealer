import { Prisma } from "@prisma/client";
import React from "react";
import ClassifiedCarousel from "./ClassifiedCarousel";
import Image from "next/image";
import {
  formatBodyType,
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import { HTMLParser } from "../shared/html_parser";
import { Button } from "../ui/button";
import Link from "next/link";
import { routes } from "@/config/route";
import { MultiStapFormEnum } from "@/config/types";
import {
  CarFrontIcon,
  CarIcon,
  CheckIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { make: true; images: true };
}>;

const features = (props: ClassifiedWithImagesAndMake) => [
  {
    id: 1,
    icon:
      props.ulezCompliance === "EXEMPT" ? (
        <CheckIcon className=" w-6 h-6 mx-auto text-gray-500"></CheckIcon>
      ) : (
        <XIcon className=" w-6 h-6 mx-auto text-red-500"></XIcon>
      ),
    label: <>{formatUlezCompliance(props.ulezCompliance)}</>,
  },
  {
    id: 2,
    icon: (
      <Fingerprint className=" w-6 h-6 mx-auto  text-gray-500 "></Fingerprint>
    ),
    label: props.vrm,
  },
  {
    id: 3,
    icon: <CarIcon className=" w-6 h-6 mx-auto  text-gray-500"></CarIcon>,
    label: formatBodyType(props.bodyType),
  },
  {
    id: 4,
    icon: <FuelIcon className=" w-6 h-6 mx-auto  text-gray-500"></FuelIcon>,
    label: formatFuelType(props.fuelType),
  },
  {
    id: 5,
    icon: <PowerIcon className=" w-6 h-6 mx-auto  text-gray-500"></PowerIcon>,
    label: formatTransmission(props.transmission),
  },
  {
    id: 6,
    icon: <GaugeIcon className=" w-6 h-6 mx-auto  text-gray-500"></GaugeIcon>,
    label: `${formatNumber(props.odoReading)} ${formatOdometerUnit(
      props.odoUnit
    )}`,
  },
  {
    id: 7,
    icon: <UsersIcon className=" w-6 h-6 mx-auto  text-gray-500"></UsersIcon>,
    label: props.seats,
  },
  {
    id: 8,
    icon: (
      <CarFrontIcon className=" w-6 h-6 mx-auto  text-gray-500"></CarFrontIcon>
    ),
    label: props.doors,
  },
];
const ClassifiedView = (props: ClassifiedWithImagesAndMake) => {
  return (
    <div className=" flex flex-col container mx-auto px-4 md:px-0 py-12">
      <div className=" flex flex-col md:flex-row">
        <div className=" relative md:w-1/2">
          <ClassifiedCarousel images={props.images}></ClassifiedCarousel>
        </div>
        <div className=" md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className=" flex-col flex md:flex-row items-start md:items-center">
            <Image
              src={props.make.image}
              alt={props.make.name}
              className=" w-20 mr-4"
              width={120}
              height={120}
            ></Image>
            <div>
              <h1 className=" text-2xl md:text-3xl font-bold">{props.title}</h1>
            </div>
          </div>
          <div className=" mt-4 flex items-center space-x-2 mb-2">
            <span className=" bg-gray-200 text-green-800 text-sm font-medium py-0.5 rounded-md px-2.5">
              {formatNumber(props.odoReading)}
              {formatOdometerUnit(props.odoUnit)}
            </span>
            <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-md">
              {formatColor(props.color)}
            </span>
            <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-md">
              {formatFuelType(props.fuelType)}
            </span>
          </div>
          {props.description && (
            <div className=" mb-4">
              <HTMLParser html={props.description}></HTMLParser>
            </div>
          )}
          <div className=" text-4xl font-bold my-4 w-full border border-slate-200 rounded-md py-12">
            Our Price:{" "}
            {formatPrice({ price: props.price, currency: props.currency })}
          </div>
          <Button
            className=" uppercase font-bold py-3 px-6 rounded w-full mb-4"
            size={"lg"}
            asChild
          >
            <Link href={routes.reserve(props.slug, MultiStapFormEnum.WELCOME)}>
              Reserve Now
            </Link>
          </Button>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features(props).map(({ id, icon, label }) => (
              <div
                key={id}
                className=" bg-gray-100 flex items-center flex-col rounded-lg shadow-xs p-4 text-center"
              >
                {icon}
                <p className=" text-sm font-medium mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifiedView;
