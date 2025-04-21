import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedClassifieds = async () => {
  const make = await prisma.make.upsert({
    where: { id: 'make_001' },
    update: {},
    create: { id: 'make_001', name: 'Toyota' },
  });

  const model = await prisma.model.upsert({
    where: { id: 'model_001' },
    update: {},
    create: {
      id: 'model_001',
      name: 'Corolla',
      makeId: make.id,
    },
  });

  const modelVariant = await prisma.modelVariant.upsert({
    where: { id: 'variant_001' },
    update: {},
    create: {
      id: 'variant_001',
      name: 'Corolla SE',
      modelId: model.id,
    },
  });

  await prisma.classified.create({
    data: {
      slug: 'toyota-corolla-se-2020',
      vrm: 'AB20XYZ',
      title: 'Toyota Corolla SE 2020',
      description: 'A well-maintained sedan with low mileage.',
      year: 2020,
      odoReading: 15000,
      doors: 4,
      seats: 5,
      price: 15000,
      makeId: make.id,
      modelId: model.id,
      modelVariantId: modelVariant.id,
      ulezCompliance: 'EXEMPT',
      transmission: 'AUTOMATIC',
      color: 'WHITE',
      fuelType: 'PETROL',
      bodyType: 'SEDAN',
      odoUnit: 'MILES',
      current: 'GBP',
      status: 'LIVE',
    }
  });

  console.log('✅ Seeded: Classified');
};
