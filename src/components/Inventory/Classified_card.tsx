import { routes } from "@/config/route";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClassifiedWithImages } from "@/config/types";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

const Classified_card = ({ classified }: ClassifiedCardProps) => {
  return (
    <div className=" bg-white relative rounded-md shadow-md overflow-hidden flex flex-col">
      <div className=" aspect-2/3 relative">
        <Link href={routes.singleClassified("sing")}>
          <Image
            placeholder="blur"
            blurDataURL={classified.images[0].blurhash}
            src={classified.images[0].src}
            alt={classified.images[0].alt}
            className=" object-cover"
            fill
            quality={25}
          ></Image>
        </Link>
        <div className=" absolute top-2.5 right-3.5 bg-primary text-slate-50 rounded font-bold px-2 py-1">
          <p className=" text-xs lg:text-base xl:text-lg font-semibold">
            {classified.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Classified_card;
