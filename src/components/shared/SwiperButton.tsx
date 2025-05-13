import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SwiperButtonProps {
  pervClassName?: string;
  nextClassName?: string;
}

const SwiperButton = (props: SwiperButtonProps) => {
  const { pervClassName, nextClassName } = props;
  return (
    <>
      <Button
        variant={"ghost"}
        type="button"
        rel="prev"
        size={"icon"}
        className={cn(
          pervClassName,
          "swiper-button-prev absolute top-1/2 -translate-y-1/2 z-10  flex items-center rounded-full "
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <ChevronLeft className=" h-8 w-8" color="black"></ChevronLeft> */}
      </Button>
      <Button
        variant={"ghost"}
        type="button"
        rel="next"
        size={"icon"}
        className={cn(
          nextClassName,
          "swiper-button-next absolute top-1/2 -translate-y-1/2 z-10  flex items-center rounded-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <ChevronRight className=" h-8 w-8" color="black"></ChevronRight> */}
      </Button>
    </>
  );
};

export default SwiperButton;
