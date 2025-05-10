import { ClassifiedWithImages } from "@/config/types";
import React, { use } from "react";
import Classified_card from "./Classified_card";

type classifiedListProps = {
  classifieds: Promise<ClassifiedWithImages[]>;
  favourites: string[];
};

const ClassfiedList = (props: classifiedListProps) => {
  const { classifieds, favourites } = props;
  // console.log(classifieds);

  const inventory = use(classifieds);
  return (
    <div className=" grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {inventory.map((classified, index) => (
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
