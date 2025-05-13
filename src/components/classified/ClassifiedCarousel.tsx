"use client";
import { Image as PrismaImages } from "@prisma/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { EffectFade, Navigation, Thumbs, Virtual } from "swiper/modules";
import SwiperButton from "../shared/SwiperButton";
import CarouselSkeleton from "./CarouselSkeleton";
import FsLightbox from "fslightbox-react";

interface ClassifiedCarouselProps {
  images: PrismaImages[];
}
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <CarouselSkeleton></CarouselSkeleton>,
});
const SwiperThumb = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  {
    ssr: false,
    loading: () => null,
  }
);

const ClassifiedCarousel = ({ images }: ClassifiedCarouselProps) => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const handleSlideChange = useCallback((Swiper1: SwiperType) => {
    setActiveIndex(Swiper1.activeIndex);
  }, []);

  const setSwiper = useCallback((swiper: SwiperType) => {
    setThumbSwiper(swiper);
  }, []);

  const handleImageClick = useCallback(() => {
    setLightbox({
      toggler: !lightbox.toggler,
      sourceIndex: activeIndex,
    });
  }, [lightbox.toggler, activeIndex]);

  const source = images.map((image) => image.src);
  return (
    <>
      <FsLightbox
        toggler={lightbox.toggler}
        sourceIndex={lightbox.sourceIndex}
        sources={source}
        type="image"
      ></FsLightbox>
      <div className=" relative">
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          effect="fade"
          spaceBetween={10}
          fadeEffect={{ crossFade: true }}
          thumbs={{ swiper: thumbSwiper }}
          modules={[EffectFade, Navigation, Thumbs, Virtual]}
          virtual={{ addSlidesAfter: 8, enabled: true }}
          onSlideChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <Image
                blurDataURL={image.blurhash}
                placeholder="blur"
                src={image.src}
                width={1200}
                height={800}
                alt={image.alt}
                className=" aspect-3/2 object-cover rounded-md cursor-pointer"
                onClick={handleImageClick}
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperButton
          pervClassName="left-4 bg-white"
          nextClassName="right-4 bg-white"
        ></SwiperButton>
        <SwiperThumb
          onSwiper={setSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs, EffectFade]}
        >
          {images.map((image) => (
            <SwiperSlide
              className=" relative mt-2 h-fit w-full cursor-grab"
              key={image.id}
            >
              <Image
                className=" object-cover aspect-3/2 rounded-md"
                width={300}
                height={200}
                src={image.src}
                alt={image.alt}
                placeholder="blur"
                blurDataURL={image.blurhash}
              ></Image>
            </SwiperSlide>
          ))}
        </SwiperThumb>
      </div>
    </>
  );
};

export default ClassifiedCarousel;
