"use client";
import { AwaitedPageProps, FilterOptions } from "@/config/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { TableCell, TableFooter, TableRow } from "../ui/table";
import Select from "../ui/select";
import CustomPagination from "./CustomPagination";

const itemsPerPageOptions: FilterOptions<string, string> = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

interface AdminTableFooterProps extends AwaitedPageProps {
  disable: boolean;
  currentPage: number;
  totalPages: number;
  baseURL: string;
  cols: number;
}

const AdminTableFooter = (props: AdminTableFooterProps) => {
  const { disable, currentPage, totalPages, baseURL, cols, searchParams } =
    props;
  const itemsPerPage = searchParams?.itemsPerPage || "10";
  const route = useRouter();

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set(e.target.name, e.target.value);
    const url = new URL(window.location.href);
    url.search = currentUrlParams.toString();
    route.push(url.toString());
  };

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("itemsPerPage", itemsPerPage as string);
    const url = new URL(window.location.href);
    route.push(url.toString());
  }, [route, itemsPerPage]);

  return (
    <div>
      <TableFooter className=" border-primary ">
        <TableRow className=" bg-primary hover:bg-transparent">
          <TableCell colSpan={cols}>
            <div className=" flex items-center">
              <Select
                name="itemPerPage"
                value={searchParams?.itemPerPage as string}
                onChange={handleItemsPerPage}
                options={itemsPerPageOptions}
                disabled={disable}
                className=" -mt-1 "
                noDefault={false}
                selectClassName=" bg-primary text-muted/75 border-primary"
              ></Select>
              <CustomPagination
                totalPages={totalPages}
                baseURL={baseURL}
                styles={{
                  paginationRoot: "justify-end",
                  paginationPrevious: "border-none hover:bg-primary text-muted",
                  paginationNext: "hover:bg-primary text-muted",
                  paginationLink: "border-none hover:bg-primary text-muted",
                  paginationLinkActive: "bg-primary text-white",
                }}
              ></CustomPagination>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </div>
  );
};

export default AdminTableFooter;
