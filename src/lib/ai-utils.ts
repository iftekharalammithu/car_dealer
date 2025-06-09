import { ModelVariant } from "@prisma/client";
import prisma from "./prismadb";

interface MapToTaxonomyCreateType {
  year: number;
  make: string;
  model: string;
  modelVariant?: string | null;
}

export async function mapTaxonomyToCreate(object: MapToTaxonomyCreateType) {
  const make = await prisma.make.findFirst({
    where: {
      name: { equals: object.make, mode: "insensitive" },
    },
  });
  if (!make) {
    throw new Error(`Make not found: ${object.make}`);
  }
  let model = await prisma.model.findFirst({
    where: {
      makeId: make.id,
      OR: [{ name: { contains: object.model, mode: "insensitive" } }],
    },
  });
  if (!model) {
    model = await prisma.$transaction(async (prismaTx) => {
      await prismaTx.$executeRaw`LOCK TABLE "models" IN EXCLUSIVE MODE`;
      return prismaTx.model.create({
        data: {
          name: object.model,
          make: { connect: { id: make.id } },
        },
      });
    });
  }
  if (!model) {
    throw new Error(`Model not found : ${object.model}`);
  }

  let ModelVariant: ModelVariant | null = null;
  if (object.modelVariant) {
    ModelVariant = await prisma.modelVariant.findFirst({
      where: {
        modelId: model.id,
        OR: [{ name: { contains: object.modelVariant, mode: "insensitive" } }],
      },
    });
    if (!ModelVariant) {
      ModelVariant = await prisma.$transaction(async (prismaTx) => {
        await prismaTx.$executeRaw`LOCK TABLE "model_variants" IN EXCLUSIVE MODE`;
        return prismaTx.modelVariant.create({
          data: {
            name: object.modelVariant as string,
            model: { connect: { id: model.id } },
            yearStart: object.year,
            yearEnd: object.year,
          },
        });
      });
    }
  }

  return {
    year: object.year,
    make: make.name,
    model: model.name,
    ModelVariant: ModelVariant?.name || null,
    makeId: make.id,
    modelId: model.id,
    modelVariantId: ModelVariant?.id || undefined,
  };
}
