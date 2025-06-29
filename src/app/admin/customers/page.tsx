import { ValidataPagination } from "@/app/schemas/pagination.schema";
import { AdminCustomerFileterSchema } from "@/app/schemas/TableFiltersSchema";
import {
  CustomerTableSortSchema,
  CustomerTableSortType,
  ValidateSortOrder,
} from "@/app/schemas/TableSort.Schema";
import AdminTableFooter from "@/components/shared/AdminTableFooter";
import { Table, TableBody } from "@/components/ui/table";
import { CustomerKeys, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { routes } from "@/config/route";
import AdminCustomerHeader from "@/components/Customer/AdminCustomerHeader";
import CustomerTableHeader from "@/components/Customer/CustomerTableHeader";
import CustomerTableRow from "@/components/Customer/CustomerTableRow";

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  // console.log(searchParams);
  const { page, itemsPerPage } = ValidataPagination({
    page: (searchParams?.page as string) || "1",
    itemsPerPage: (searchParams?.itemsPerPage as "10") || "10",
  });

  const { sort, order } = ValidateSortOrder<CustomerTableSortType>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as "asc" | "desc",
    schema: CustomerTableSortSchema,
  });

  const offset = (Number(page) - 1) * Number(itemsPerPage);

  const { data, error } = AdminCustomerFileterSchema.safeParse(searchParams);
  if (error) {
    console.log("Validation Error", error);
  }

  const customer = await prisma.customer.findMany({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: "insensitive" } }),
      ...(data?.status && data.status !== "ALL" && { status: data.status }),
    },
    orderBy: { [sort as string]: order as "asc" | "desc" },
    include: { classfied: true },
    skip: offset,
    take: Number(itemsPerPage),
  });

  const count = await prisma.customer.count({
    where: {
      ...(data?.q && { title: { contains: data.q, mode: "insensitive" } }),
      ...(data?.status && data.status !== "ALL" && { status: data.status }),
    },
  });

  const totalPages = Math.ceil(count / Number(itemsPerPage));

  return (
    <div>
      <AdminCustomerHeader searchParams={searchParams}></AdminCustomerHeader>
      <Table>
        <CustomerTableHeader
          sort={sort as CustomerKeys}
          order={order as "asc" | "desc"}
        ></CustomerTableHeader>
        <TableBody>
          {customer.map((customer) => (
            <CustomerTableRow
              key={customer.id}
              {...customer}
            ></CustomerTableRow>
          ))}
        </TableBody>

        <AdminTableFooter
          totalPages={totalPages}
          disable={!customer.length}
          cols={10}
          baseURL={routes.admin.customers}
          searchParams={searchParams}
        ></AdminTableFooter>
      </Table>
    </div>
  );
};

export default page;
