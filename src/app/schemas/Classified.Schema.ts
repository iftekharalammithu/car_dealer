import { z } from "zod";
import {
  BodyType,
  ClassifiedStatus,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";

export const ClassifiedSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  odoUnit: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  door: z.string().optional(),
  seats: z.string().optional(),
  ulezCompliance: z.string().optional(),
  color: z.string().optional(),
});

export const updateClassifiedSchema = z.object({
  id: z.string(),
  year: z.string(),
  make: z.string(),
  model: z.string(),
  modelVariant: z.string().optional(),

  description: z.string(),
  vrm: z.string(),
  odoReading: z.number(),
  doors: z.number().max(8).min(1),
  seats: z.number().max(12).min(1),
  ulezCompliance: z.nativeEnum(ULEZCompliance, {
    message: "Invalid ULEZCompliance",
  }),
  transmission: z.nativeEnum(Transmission, { message: "Invalid Transmission" }),
  color: z.nativeEnum(Color, { message: "Invalid Color" }),
  fuelType: z.nativeEnum(FuelType, { message: "Invalid Fuel Type" }),
  bodyType: z.nativeEnum(BodyType, { message: "Invalid Body Type" }),
  odoUnit: z.nativeEnum(OdoUnit, { message: "Invalid Odo Unit" }),
  status: z.nativeEnum(ClassifiedStatus),
  price: z.number(),
  currency: z.nativeEnum(CurrencyCode, { message: "Invalid Currency" }),
  images: z.array(
    z.object({
      id: z.string().optional(),
      src: z.string().url(),
      alt: z.string(),
      uuid: z.string().uuid().optional(),
      base64: z.string().optional(),
      done: z.boolean().optional(),
    })
  ),
});

export type updateClassifiedType = z.infer<typeof updateClassifiedSchema>;
