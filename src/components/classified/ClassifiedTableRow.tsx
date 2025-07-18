import { ClassifiedWithImages } from "@/config/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatClassifiedStatus, formatColor, formatPrice } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { classifiedBadgeMap } from "@/config/constants";
import { format } from "date-fns";
import ActionButtons from "./ActionButtons";

const ClassifiedTableRow = (classified: ClassifiedWithImages) => {
  return (
    <TableRow className=" text-muted border-white">
      <TableCell className=" font-medium">{classified.id}</TableCell>
      <TableCell className=" p-0">
        <Image
          src={classified.images[0].src}
          alt={classified.images[0].alt}
          width={120}
          height={80}
          quality={1}
          className=" aspect-3/2 object-cover rounded"
        ></Image>
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {classified.title}
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {formatPrice({
          price: classified.price,
          currency: classified.currency,
        })}
      </TableCell>
      <TableCell className="  hidden md:table-cell">{classified.vrm}</TableCell>
      <TableCell className="  hidden md:table-cell">
        {formatColor(classified.color)}
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        <Badge variant={classifiedBadgeMap[classified.status]}>
          {formatClassifiedStatus(classified.status)}
        </Badge>
      </TableCell>
      <TableCell className="  hidden md:table-cell">
        {format(classified.createdAt, "do MMM yyy HH:mm")}
      </TableCell>
      <TableCell className="">{classified.views}</TableCell>
      <TableCell className=" flex gap-x-2">
        <ActionButtons classified={classified}></ActionButtons>
      </TableCell>
    </TableRow>
  );
};

export default ClassifiedTableRow;
