import { CustomerWithClassified } from "@/config/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { formatCustomerStatus } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { CustomerBadgeMap } from "@/config/constants";
import { format } from "date-fns";
import CustomerActionButtons from "./CustomerActionButton";

const CustomerTableRow = (Customer: CustomerWithClassified) => {
  return (
    <TableRow className=" text-muted border-white">
      <TableCell className=" font-medium">{Customer.id}</TableCell>
      <TableCell className=" font-medium">
        <Badge
          className=" text-muted/75 "
          variant={CustomerBadgeMap[Customer.status]}
        ></Badge>
        {formatCustomerStatus(Customer.status)}
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {Customer.firstName}
        {Customer.lastName}
      </TableCell>
      <TableCell className="  hidden md:table-cell">{Customer.email}</TableCell>
      <TableCell className="  hidden md:table-cell">
        {Customer.mobile}
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {Customer.classfied?.title} ({Customer.classfied?.vrm})
      </TableCell>

      <TableCell className="  hidden md:table-cell">
        {format(Customer.createdAt, "dd MMM yyy HH:mm")}
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {format(Customer.updatedAt, "dd MMM yyy HH:mm")}
      </TableCell>

      <TableCell className="  hidden md:table-cell">
        {Customer.bookingDate
          ? format(Customer.updatedAt, "dd MMM yyy HH:mm")
          : "N/A"}
      </TableCell>

      <TableCell className=" flex gap-x-2">
        <CustomerActionButtons customer={Customer}></CustomerActionButtons>
      </TableCell>
    </TableRow>
  );
};

export default CustomerTableRow;
