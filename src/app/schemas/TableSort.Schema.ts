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

interface ValidateSortOrderArgs<TSchemaType> {
  sort: string;
  order: string;
  schema: TSchemaType extends ClassifiedTableSortType
    ? typeof ClassifiedsTableSortSchema
    : typeof ClassifiedsTableSortSchema;
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
