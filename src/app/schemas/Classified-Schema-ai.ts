import {
  BodyType,
  Color,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { z } from "zod";

export const ClassifiedTaxonomyAISchema = z.object({
  year: z.number().describe("Year of the vehicle"),
  makeId: z.string().describe("The make ID of the vehicle"),
  make: z.string().describe("Make of the vehicle"),
  modelId: z.string().describe("The model ID of the vehicle"),
  model: z.string().describe("Model of the vehicle"),
  modelVariantId: z.string().describe("The model variant ID of the vehicle"),
  modelVariant: z.string().describe("Model variant of the vehicle"),
});

export const ClassifiedDetailsSchema = z.object({
  description: z
    .string()
    .describe(
      "The Description of the vehicle. Ensure it should 50 word or less"
    ),
  vrm: z.string().describe(" Vehicle Registration Mark (VRM) of the vehicle"),
  odoReading: z.number().describe(" Odometer reading of the vehicle"),
  doors: z.number().describe(" Number of doors of the vehicle"),
  seats: z.number().describe(" Number of seats of the vehicle"),
  ulezCompliance: z
    .nativeEnum(ULEZCompliance)
    .describe(" ULEZ Compliance of the vehicle"),
  transmission: z
    .nativeEnum(Transmission)
    .describe(" Transmission type of the vehicle"),
  color: z.nativeEnum(Color).describe(" Color of the vehicle"),
  fuelType: z.nativeEnum(FuelType).describe(" Fuel type of the vehicle"),
  bodyType: z.nativeEnum(BodyType).describe(" Body type of the vehicle"),
  odoUnit: z.nativeEnum(OdoUnit).describe(" Odometer unit of the vehicle"),
});

export const ClassifieddAiSchema = ClassifiedDetailsSchema.merge(
  ClassifiedTaxonomyAISchema
).extend({
  title: z.string().describe("Title of the Vehicle").optional(),
  image: z.string().describe("Image URL of the Vehicle").optional(),
});

export type ClassifiedAi = z.infer<typeof ClassifieddAiSchema>;
