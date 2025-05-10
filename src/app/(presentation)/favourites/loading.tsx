import InventorySkeleton from "@/components/Inventory/InventorySkeleton";
import React from "react";

const FavouritesLoading = () => {
  return (
    <div className=" container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className=" text-3xl font-bold mb-6">Your Favourite Classifieds</h1>
      <InventorySkeleton></InventorySkeleton>
    </div>
  );
};

export default FavouritesLoading;
