import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const ClassifiedCardSkeleton = () => {
  return (
    <Card className="  border border-muted">
      <div className=" relative w-full">
        <Skeleton className=" w-full h-full aspect-3/2"> </Skeleton>
      </div>
      <CardContent className=" p-4 h-fit">
        <div className=" space-y-4 h-[180px]">
          <div className=" space-y-2">
            <Skeleton className=" h-6 w-3/4"></Skeleton>
            <Skeleton className=" h-4 w-full"></Skeleton>
            <Skeleton className=" h-4 mr-8 w-3/4"></Skeleton>
          </div>
          <div className=" space-y-2">
            <div className=" space-x-2 flex justify-around">
              <Skeleton className=" w-1/12 h-4"></Skeleton>
              <Skeleton className=" w-1/12 h-4"></Skeleton>
              <Skeleton className=" w-1/12 h-4"></Skeleton>
              <Skeleton className=" w-1/12 h-4"></Skeleton>
            </div>
            <div className=" space-x-2 flex justify-around">
              <Skeleton className=" w-1/4 h-4"></Skeleton>
              <Skeleton className=" w-1/4 h-4"></Skeleton>
              <Skeleton className=" w-1/4 h-4"></Skeleton>
              <Skeleton className=" w-1/4 h-4"></Skeleton>
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <Skeleton className=" w-1/3 h-6"></Skeleton>
            <Skeleton className=" w-1/4 h-4"></Skeleton>
          </div>
        </div>
        <div className="flex relative gap-x-2 justify-between">
          <Skeleton className=" w-1/2 h-10"></Skeleton>
          <Skeleton className=" w-1/2 h-10"></Skeleton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassifiedCardSkeleton;
