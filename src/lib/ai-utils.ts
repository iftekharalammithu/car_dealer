import { ModelVariant } from "@prisma/client";
import prisma from "./prismadb";

interface MapToTaxonomyCreateType {
  year: number;
  make: string;
  model: string;
  modelVariant?: string | null;
}

export async function mapTaxonomyToCreate(object: MapToTaxonomyCreateType) {
  // Find or create make (case insensitive)
  const make = await prisma.make.findFirst({
    where: {
      name: { equals: object.make, mode: "insensitive" },
    },
  });

  if (!make) {
    throw new Error(`Make not found/created: ${object.make}`);
  }

  // Find or create model (case insensitive)
  let model = await prisma.model.findFirst({
    where: {
      makeId: make.id,
      name: { contains: object.model, mode: "insensitive" },
    },
  });

  if (!model) {
    // In MongoDB, we don't need table locking - just try to create
    // If there's a race condition, the unique constraint will handle it
    try {
      model = await prisma.model.create({
        data: {
          name: object.model,
          make: { connect: { id: make.id } },
        },
      });
    } catch (error) {
      console.log(error);
      // If creation failed due to duplicate, try to find again
      model = await prisma.model.findFirst({
        where: {
          makeId: make.id,
          name: { contains: object.model, mode: "insensitive" },
        },
      });
      if (!model) {
        throw new Error(`Model not found/created: ${object.model}`);
      }
    }
  }

  // Handle model variant if provided
  let modelVariant: ModelVariant | null = null;
  if (object.modelVariant) {
    modelVariant = await prisma.modelVariant.findFirst({
      where: {
        modelId: model.id,
        name: { contains: object.modelVariant, mode: "insensitive" },
      },
    });

    if (!modelVariant) {
      try {
        modelVariant = await prisma.modelVariant.create({
          data: {
            name: object.modelVariant as string,
            model: { connect: { id: model.id } },
            yearStart: object.year,
            yearEnd: object.year,
          },
        });
      } catch (error) {
        console.log(error);
        // If creation failed due to duplicate, try to find again
        modelVariant = await prisma.modelVariant.findFirst({
          where: {
            modelId: model.id,
            name: { contains: object.modelVariant, mode: "insensitive" },
          },
        });
      }
    }
  }

  return {
    year: object.year,
    make: make.name,
    model: model.name,
    modelVariant: modelVariant?.name || null,
    makeId: make.id,
    modelId: model.id,
    modelVariantId: modelVariant?.id || undefined,
  };
}
