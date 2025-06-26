"use client";
import { sortorder } from "@/config/constants";
import { classifiedKeys, PageProps } from "@/config/types";
import { Classified } from "@prisma/client";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { SortIcon } from "../shared/Sort-icon";

const classifiedKeys2 = [
  "status",
  "title",
  "vrm",
  "id",
  "views",
  "year",
  "color",
  "price",
  "createdAt",
];

interface classifiedTableProps extends PageProps {
  classified: Classified[];
  sort: classifiedKeys;
  order: "asc" | "desc";
  currentPage: number;
  totalPages: number;
}

type ClassifiedTableHeaderProps = Pick<classifiedTableProps, "sort" | "order">;

const ClassifiedTableHeader = (props: ClassifiedTableHeaderProps) => {
  const { sort: initialSort, order: initialOrder } = props;
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(classifiedKeys2)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  );
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringLiteral(sortorder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  );

  const handleSort = (newSort: classifiedKeys) => {
    if (newSort === sort) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(newSort);
      setOrder("asc");
    }
  };
  return (
    <TableHeader>
      <TableRow className=" hover:bg-transparent border-primary">
        <TableHead className=" text-muted w-[80px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("id")}
            onKeyDown={() => handleSort("id")}
          >
            ID{" "}
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"id"}
              currentSort={sort}
            ></SortIcon>
          </div>
        </TableHead>
        <TableHead className=" text-muted w-[80px]">Image</TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("title")}
            onKeyDown={() => handleSort("title")}
          >
            Title
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"title"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("price")}
            onKeyDown={() => handleSort("price")}
          >
            Price
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"price"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("vrm")}
            onKeyDown={() => handleSort("vrm")}
          >
            VRM
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"vrm"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("color")}
            onKeyDown={() => handleSort("color")}
          >
            Color
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"color"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted ">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("status")}
            onKeyDown={() => handleSort("status")}
          >
            Status
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"status"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted hidden md:table-cell">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("createdAt")}
            onKeyDown={() => handleSort("createdAt")}
          >
            Date Created
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"createdAt"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted ">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("views")}
            onKeyDown={() => handleSort("views")}
          >
            Views
            <SortIcon
              currentOrder={order as "asc" | "desc" | null}
              sort={"views"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[100px] ">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ClassifiedTableHeader;
