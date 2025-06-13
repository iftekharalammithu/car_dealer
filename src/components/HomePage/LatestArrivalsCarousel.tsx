"use client";
import dynamic from "next/dynamic";
import React from "react";
import ClassifiedCardSkeleton from "../Inventory/Classified-card-skeleton";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Classified_card from "../Inventory/Classified_card";
import SwiperButton from "../shared/SwiperButton";
import "swiper/css";
import { ClassifiedWithImages } from "@/config/types";
interface LatestArrivalsCarouselProps {
  classifieds: ClassifiedWithImages[];
  favourites: string[];
}
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <ClassifiedCardSkeleton key={i}></ClassifiedCardSkeleton>
      ))}{" "}
    </div>
  ),
});

const LatestArrivalsCarousel = (props: LatestArrivalsCarouselProps) => {
  const { classifieds, favourites } = props;
  return (
    <div className=" mt-8 bdr w-full relative">
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        effect="fade"
        spaceBetween={10}
        pagination={{ clickable: true }}
        slidesPerView={1}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
      >
        {classifieds.map((classified) => {
          return (
            <SwiperSlide key={classified.id}>
              <Classified_card
                classified={classified}
                favourites={favourites}
              ></Classified_card>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperButton
        pervClassName=" -left-16 border border-2 border-border hidden lg:flex"
        nextClassName=" -right-16 border border-2 border-border hidden lg:flex"
      ></SwiperButton>
    </div>
  );
};

export default LatestArrivalsCarousel;
