import { ClassifiedWithImages } from "@/config/types";
import React from "react";
import Classified_card from "./Classified_card";

type classifiedListProps = {
  classifieds: ClassifiedWithImages[];
  favourites: string[];
};

const ClassfiedList = (props: classifiedListProps) => {
  const { classifieds, favourites } = props;
  // console.log(classifieds);

  return (
    <div className=" grid grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-4">
      {classifieds.map((classified, index) => (
        <Classified_card
          key={index}
          classified={classified}
          favourites={favourites}
        ></Classified_card>
      ))}
    </div>
  );
};

export default ClassfiedList;
