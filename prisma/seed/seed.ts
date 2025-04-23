// Run the File below The Commend
// node ./prisma/seed/seed.ts

// import { PrismaClient } from "@prisma/client";
// import { seedUsers } from "./users";
// import { seedClassifieds } from "./classifiedseed";

// // why seed?
// // seed use to test the database for check
// // i didn't complete this seed section bcz its take too much time . i check menualy all the model works great.

// const prisma = new PrismaClient();

// async function main() {
//     console.log('test')
//     //   await seedUsers();
//     await seedClassifieds()

// }

// main().catch((e) => {
//     throw e;
// }).finally(async () => {
//   await prisma.$disconnect();
// });
// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data (order matters due to FK constraints)
  await prisma.customerLifeCycle.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.image.deleteMany();
  await prisma.classified.deleteMany();
  await prisma.modelVariant.deleteMany();
  await prisma.model.deleteMany();
  await prisma.make.deleteMany();

  // Create Make, Model, and Variant
  const make = await prisma.make.create({
    data: {
      name: "Mazda",
      image:
        "https://image.lexica.art/full_webp/67773f57-cce6-4c48-9b3a-5cd8c4d3ce29",
    },
  });

  const model = await prisma.model.create({
    data: {
      name: "Mazda3",
      makeId: make.id,
    },
  });

  const modelVariant = await prisma.modelVariant.create({
    data: {
      name: "Mazda3 Turbo",
      yearStart: 2020,
      yearEnd: 2025,
      modelId: model.id,
    },
  });

  const classifiedsData = [
    {
      slug: "mazda3-1",
      title: "Mazda3 Turbo 2020",
      year: 2020,
      odoReading: 10000,
      price: 20000,
    },
    {
      slug: "mazda3-2",
      title: "Mazda3 Turbo 2021",
      year: 2021,
      odoReading: 8000,
      price: 21000,
    },
    {
      slug: "mazda3-3",
      title: "Mazda3 Turbo 2022",
      year: 2022,
      odoReading: 5000,
      price: 22000,
    },
    {
      slug: "mazda3-4",
      title: "Mazda3 Turbo 2023",
      year: 2023,
      odoReading: 3000,
      price: 23000,
    },
    {
      slug: "mazda3-5",
      title: "Mazda3 Turbo 2024",
      year: 2024,
      odoReading: 1500,
      price: 24000,
    },
  ];

  for (let i = 0; i < classifiedsData.length; i++) {
    const classified = await prisma.classified.create({
      data: {
        ...classifiedsData[i],
        description: `Stylish and fun-to-drive Mazda3 Turbo from ${classifiedsData[i].year}.`,
        doors: 4,
        seats: 5,
        makeId: make.id,
        modelId: model.id,
        modelVariantId: modelVariant.id,
        fuelType: "PETROL",
        transmission: "AUTOMATIC",
        color: "RED",
        bodyType: "SEDAN",
        images: {
          create: [
            {
              alt: `Mazda3 ${classifiedsData[i].year}`,
              src: "https://image.lexica.art/full_webp/67773f57-cce6-4c48-9b3a-5cd8c4d3ce29",
              blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
              isMain: true,
            },
          ],
        },
      },
    });

    await prisma.customer.create({
      data: {
        firstName: `User${i + 1}`,
        lastName: `Test`,
        email: `user${i + 1}@test.com`,
        mobile: `99988877${i + 1}`,
        classfiedId: classified.id,
        termsAccepted: true,
        lifeCycles: {
          create: {
            oldStatus: "INTERESTED",
            newStatus: "CONTACTED",
          },
        },
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .then(() => console.log("done"))
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
