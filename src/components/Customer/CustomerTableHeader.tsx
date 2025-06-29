"use client";
import { sortorder } from "@/config/constants";
import { CustomerKeys, PageProps } from "@/config/types";
import { Customer } from "@prisma/client";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { SortIcon } from "../shared/Sort-icon";

const CustomerKeys2 = [
  "id",
  "email",
  "mobile",
  "firstName",
  "lastName",
  "updatedAt",
  "createdAt",
  "status",
  "bookingDate",
  "classfied",
] as const;

interface CustomerTableProps extends PageProps {
  Customer: Customer[];
  sort: CustomerKeys;
  order: "asc" | "desc";
  currentPage: number;
  totalPages: number;
}

type CustomerTableHeaderProps = Pick<CustomerTableProps, "sort" | "order">;

const CustomerTableHeader = (props: CustomerTableHeaderProps) => {
  const { sort: initialSort, order: initialOrder } = props;
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(CustomerKeys2)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  );
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringLiteral(sortorder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  );

  const handleSort = (newSort: CustomerKeys) => {
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
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort={"id"}
            ></SortIcon>
          </div>
        </TableHead>
        <TableHead className=" text-muted w-[80px]">Image</TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("status")}
            onKeyDown={() => handleSort("status")}
          >
            Status
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"status"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("firstName")}
            onKeyDown={() => handleSort("firstName")}
          >
            Name
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"firstName"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("email")}
            onKeyDown={() => handleSort("email")}
          >
            Email
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"email"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[150px]">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("mobile")}
            onKeyDown={() => handleSort("mobile")}
          >
            Mobile
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"mobile"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted max-w-[150px] ">Classified</TableHead>
        <TableHead className=" text-muted hidden md:table-cell">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("createdAt")}
            onKeyDown={() => handleSort("createdAt")}
          >
            Date Created
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"createdAt"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted hidden md:table-cell">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("updatedAt")}
            onKeyDown={() => handleSort("updatedAt")}
          >
            Date Updated
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"updatedAt"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted ">
          <div
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => handleSort("bookingDate")}
            onKeyDown={() => handleSort("bookingDate")}
          >
            Booking Date
            <SortIcon<CustomerKeys>
              currentOrder={order as "asc" | "desc" | null}
              sort={"bookingDate"}
              currentSort={sort}
            ></SortIcon>
          </div>{" "}
        </TableHead>
        <TableHead className=" text-muted w-[100px] ">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CustomerTableHeader;
