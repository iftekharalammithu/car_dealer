import { ClassifiedWithImages } from "@/config/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";

const ClassifiedTableRow = (classified: ClassifiedWithImages) => {
  return (
    <TableRow className=" text-muted border-white">
      <TableCell className=" font-medium">{classified.id}</TableCell>
    </TableRow>
  );
};

export default ClassifiedTableRow;
