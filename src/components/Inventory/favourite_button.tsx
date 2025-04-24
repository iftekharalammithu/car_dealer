import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { api } from "@/lib/api-client";
import { endpoints } from "@/config/endpoints";
import { useRouter } from "next/navigation";

type Favouritebutton = {
  isFavourite: boolean;
  setIsFavourite: (isFavourite: boolean) => void;
  classifiedId: string;
};

const Favourite_button = (props: Favouritebutton) => {
  const { isFavourite, setIsFavourite, classifiedId } = props;

  const router = useRouter();

  const handleFavourite = async () => {
    const { ids } = await api.post<{ ids: string[] }>(endpoints.favourites, {
      json: { classifiedId },
    });

    if (ids.includes(classifiedId)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
    setTimeout(() => {
      router.refresh();
    }, 250);
  };

  return (
    <Button
      onClick={handleFavourite}
      variant={"ghost"}
      size={"icon"}
      //   In cn css !h-3 the ! use for !Important
      className={cn(
        " absolute top-2.5 left-3.5 rounded-full z-10 group !h-3 !w-6 lg:!h-8 lg:!w-8 xl:!h-10 xl:!w-10 cursor-pointer",
        isFavourite ? "bg-white" : "bg-muted/15"
      )}
    >
      <HeartIcon
        className={cn(
          "duration-200 transition-colors ease-in-out text-white w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 ",
          isFavourite
            ? "text-pink-500 fill-pink-500"
            : "group-hover:text-pink-500 group-hover:fill-pink-500"
        )}
      ></HeartIcon>
    </Button>
  );
};

export default Favourite_button;
