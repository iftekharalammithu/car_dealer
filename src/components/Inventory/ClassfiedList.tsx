import { ClassifiedWithImages } from "@/config/types";
import React from "react";
import Classified_card from "./Classified_card";

type classifiedListProps = {
  classifieds: ClassifiedWithImages[];
};

const ClassfiedList = (props: classifiedListProps) => {
  const { classifieds } = props;
  console.log(classifieds);

  return (
    <div className=" grid grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-4">
      <Classified_card classified={classifieds[0]}></Classified_card>
      <Classified_card classified={classifieds[1]}></Classified_card>
    </div>
  );
};

export default ClassfiedList;
