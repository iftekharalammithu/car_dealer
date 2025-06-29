import { z } from "zod";

export const ClassifiedsTableSortSchema = z.object({
  order: z.enum(["asc", "desc"]).default("desc"),
  sort: z
    .enum([
      "status",
      "title",
      "vrm",
      "id",
      "views",
      "year",
      "color",
      "price",
      "createdAt",
    ])
    .default("createdAt"),
});

export type ClassifiedTableSortType = z.infer<
  typeof ClassifiedsTableSortSchema
>;
export const CustomerTableSortSchema = z.object({
  order: z.enum(["asc", "desc"]).default("desc"),
  sort: z
    .enum([
      "id",
      "email",
      "mobile",
      "firstName",
      "lastName",
      "updateAt",
      "createdAt",
      "status",
      "bookingDate",
      "classified",
    ])
    .default("createdAt"),
});

export type CustomerTableSortType = z.infer<typeof CustomerTableSortSchema>;

interface ValidateSortOrderArgs<TSchemaType> {
  sort: string;
  order: string;
  schema: TSchemaType extends ClassifiedTableSortType
    ? typeof ClassifiedsTableSortSchema
    : typeof CustomerTableSortSchema;
}

export function ValidateSortOrder<TSchemaType>(
  args: ValidateSortOrderArgs<TSchemaType>
) {
  const { sort, order, schema } = args;
  const { data, success, error } = schema.safeParse({
    sort,
    order,
  });

  if (error) {
    console.log("Validation Error", error);
  }
  if (!success) {
    return {
      sort: undefined,
      order: undefined,
    };
  }
  return data;
}
