import { ClassifiedAi } from "@/app/schemas/Classified-Schema-ai";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import { Make } from "@prisma/client";
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
import Image from "next/image";
import React from "react";

export type StreambleSkeletonProps = Partial<Omit<ClassifiedAi, "make">> & {
  make?: Make;
  done?: boolean;
};

const StreambleSkeleton = (props: StreambleSkeletonProps) => {
  const {
    image,
    title,
    odoReading,
    fuelType,
    transmission,
    description,
    bodyType,
    seats,
    doors,
    ulezCompliance,
    odoUnit,
    make,
    done,
    vrm,
    color,
  } = props;
  return (
    <div className="  flex flex-col container mx-auto py-12">
      <div className="flex flex-col md:flex-row">
        <div className=" md:w-1/2 relative">
          {image ? (
            <Image
              src={image}
              alt={title || "vahicle Image"}
              width={600}
              height={400}
              className=" rounded-lg aspect-3/2 object-cover"
            ></Image>
          ) : (
            <Skeleton></Skeleton>
          )}
        </div>
        <div className=" md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {make ? (
              <Image
                src={make.image}
                alt={make.name}
                width={80}
                height={64}
                className=" mr-4"
              ></Image>
            ) : !done ? (
              <Skeleton className=" w-20 h-16  mr-4"></Skeleton>
            ) : null}
            <div>
              {title ? (
                <h1 className=" text-2xl font-bold">{title}</h1>
              ) : (
                <Skeleton className=" h-8 w-64 mb-2"></Skeleton>
              )}
            </div>
          </div>
          <div className=" my-4 flex flex-wrap items-center gap-2">
            {odoReading && odoUnit ? (
              <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2 py-5 rounded-md">
                {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
              </span>
            ) : !done ? (
              <Skeleton className=" h-6 w-16 rounded-md "></Skeleton>
            ) : null}
            {fuelType ? (
              <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2 py-5 rounded-md">
                {formatFuelType(fuelType)}
              </span>
            ) : !done ? (
              <Skeleton className=" h-6 w-16 rounded-md "></Skeleton>
            ) : null}
            {color ? (
              <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2 py-5 rounded-md">
                {formatColor(color)}
              </span>
            ) : !done ? (
              <Skeleton className=" h-6 w-16 rounded-md "></Skeleton>
            ) : null}
            {transmission ? (
              <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2 py-5 rounded-md">
                {formatTransmission(transmission)}
              </span>
            ) : !done ? (
              <Skeleton className=" h-6 w-16 rounded-md "></Skeleton>
            ) : null}
          </div>
          {description ? (
            <p className=" text-gray-600 mb-4">{description}</p>
          ) : (
            <Skeleton className=" h-20 w-full mb-4"></Skeleton>
          )}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              {ulezCompliance === "EXEMPT" ? (
                <CheckIcon className=" w-6 h-6 mx-auto text-zinc-600 "></CheckIcon>
              ) : (
                <XIcon className=" w-6 h-6 mx-auto text-zinc-600 "></XIcon>
              )}
              {ulezCompliance ? (
                <p className=" text-sm font-medium mt-2">
                  {formatUlezCompliance(ulezCompliance)}
                </p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <Fingerprint className=" w-6 h-6 mx-auto text-zinc-600 "></Fingerprint>
              {vrm ? (
                <p className=" text-sm font-medium mt-2">{vrm}</p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <CarIcon className=" w-6 h-6 mx-auto text-zinc-600 "></CarIcon>
              {bodyType ? (
                <p className=" text-sm font-medium mt-2">{bodyType}</p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <FuelIcon className=" w-6 h-6 mx-auto text-zinc-600 "></FuelIcon>
              {fuelType ? (
                <p className=" text-sm  font-medium mt-2">
                  {formatFuelType(fuelType)}
                </p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm  font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <PowerIcon className=" w-6 h-6 mx-auto text-zinc-600 "></PowerIcon>
              {transmission ? (
                <p className=" text-sm  font-medium mt-2">
                  {formatTransmission(transmission)}
                </p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm  font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <GaugeIcon className=" w-6 h-6 mx-auto text-zinc-600 "></GaugeIcon>
              {odoReading && odoUnit ? (
                <p className=" text-sm  font-medium mt-2">
                  {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
                </p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm  font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <UsersIcon className=" w-6 h-6 mx-auto text-zinc-600 "></UsersIcon>
              {seats ? (
                <p className=" text-sm  font-medium mt-2">{seats}</p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm  font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className=" bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <CarFrontIcon className=" w-6 h-6 mx-auto text-zinc-600 "></CarFrontIcon>
              {doors ? (
                <p className=" text-sm  font-medium mt-2">{doors}</p>
              ) : !done ? (
                <Skeleton className=" gap-4 w-16 mx-auto mt-2"></Skeleton>
              ) : (
                <p className=" text-sm  font-medium mt-2">UNKNOWN</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreambleSkeleton;
