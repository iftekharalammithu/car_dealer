import { ValidataPagination } from "@/app/schemas/pagination.schema";
import { AdminClassifiedFileterSchema } from "@/app/schemas/TableFiltersSchema";
import {
  ClassifiedsTableSortSchema,
  ClassifiedTableSortType,
  ValidateSortOrder,
} from "@/app/schemas/TableSort.Schema";
import AdminClassifiedsHeader from "@/components/Admin/Classified/AdminClassifiedsHeader";
import AdminTableFooter from "@/components/shared/AdminTableFooter";
import ClassifiedTableHeader from "@/components/classified/ClassifiedTableHeader";
import ClassifiedTableRow from "@/components/classified/ClassifiedTableRow";
import { Table, TableBody } from "@/components/ui/table";
import { classifiedKeys, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  // console.log(searchParams);
  const { page, itemsPerPage } = ValidataPagination({
    page: (searchParams?.page as string) || "1",
    itemsPerPage: (searchParams?.itemsPerPage as "10") || "10",
  });

  const { sort, order } = ValidateSortOrder<ClassifiedTableSortType>({
    sort: searchParams?.sort as classifiedKeys,
    order: searchParams?.order as "asc" | "desc",
    schema: ClassifiedsTableSortSchema,
  });

  const offset = (Number(page) - 1) * Number(itemsPerPage);

  const { data, error } = AdminClassifiedFileterSchema.safeParse(searchParams);
  if (error) {
    console.log("Validation Error", error);
  }

  const classified = await prisma.classified.findMany({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: "insensitive" } }),
      ...(data?.status && data.status !== "ALL" && { status: data.status }),
    },
    orderBy: { [sort as string]: order as "asc" | "desc" },
    include: { images: { take: 1 } },
    skip: offset,
    take: Number(itemsPerPage),
  });

  const count = await prisma.classified.count({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: "insensitive" } }),
      ...(data?.status && data.status !== "ALL" && { status: data.status }),
    },
  });

  const totalPages = Math.ceil(count / Number(itemsPerPage));

  return (
    <div>
      <AdminClassifiedsHeader
        searchParams={searchParams}
      ></AdminClassifiedsHeader>
      <Table>
        <ClassifiedTableHeader
          sort={sort as classifiedKeys}
          order={order as "asc" | "desc"}
        ></ClassifiedTableHeader>
        <TableBody>
          {classified.map((classified) => (
            <ClassifiedTableRow
              key={classified.id}
              {...classified}
            ></ClassifiedTableRow>
          ))}
        </TableBody>

        <AdminTableFooter></AdminTableFooter>
      </Table>
    </div>
  );
};

export default page;
