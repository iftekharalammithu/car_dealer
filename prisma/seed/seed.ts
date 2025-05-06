// // Run the File below The Commend
// // node ./prisma/seed/seed.ts

// // import { PrismaClient } from "@prisma/client";
// // import { seedUsers } from "./users";
// // import { seedClassifieds } from "./classifiedseed";

// // // why seed?
// // // seed use to test the database for check
// // // i didn't complete this seed section bcz its take too much time . i check menualy all the model works great.

// // const prisma = new PrismaClient();

// // async function main() {
// //     console.log('test')
// //     //   await seedUsers();
// //     await seedClassifieds()

// // }

// // main().catch((e) => {
// //     throw e;
// // }).finally(async () => {
// //   await prisma.$disconnect();
// // });
// // prisma/seed.js
// // seed.js
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const imageUrls = [
//   "https://image.lexica.art/full_webp/8fc3d13a-317a-4c15-a0f9-1ddbe6e00bef",
//   "https://image.lexica.art/full_webp/4aaab2a0-8818-409d-8cc2-59930f23dfdb",
//   "https://image.lexica.art/full_webp/030d861b-09c7-4ab4-9977-f9ec2eeb1228",
//   "https://image.lexica.art/full_webp/264f24ad-9211-45b5-91c1-40a7851d96b6",
//   "https://image.lexica.art/full_webp/96970bbb-ae24-482c-9784-6c95c106705a",
//   "https://image.lexica.art/full_webp/b4d2c410-45c3-4577-925f-2fccc543cc7f",
//   "https://image.lexica.art/full_webp/1f3973c0-ab64-431f-9036-8143e6975738",
//   "https://image.lexica.art/full_webp/8d30a326-e709-450c-8c3b-6a5d9d98170b",
//   "https://image.lexica.art/full_webp/0cc38f6f-7296-4f30-8db4-91b028977ec0",
//   "https://image.lexica.art/full_webp/259c3003-eeae-4ecf-8ca6-8fbfa057ab1f",
//   "https://image.lexica.art/full_webp/6d2c8273-579b-417b-8f16-6347530ac599",
//   "https://image.lexica.art/full_webp/33e23568-7860-4915-a6a8-b6df36b50c71",
//   "https://image.lexica.art/full_webp/848c0f23-e8ea-4240-b609-5847d3854e88",
//   "https://image.lexica.art/full_jpg/3df579ef-65a9-4e76-837a-d63108f76b63",
//   "https://image.lexica.art/full_jpg/5e614616-f773-4ec3-a360-ebc84dc374f1",
//   "https://image.lexica.art/full_webp/224455d4-6473-4080-b2c1-e566e3892416",
//   "https://image.lexica.art/full_webp/214c424c-182b-4377-b8c9-d80e00e789b6",
//   "https://image.lexica.art/full_webp/02a50bed-a080-44dc-8e24-6838f1d0d43c",
//   "https://image.lexica.art/full_webp/51119c2c-7922-4f9f-952f-ba9c1c80964e",
//   "https://image.lexica.art/full_webp/17fb12f0-4b74-4982-99f7-d8e6b95a977c",
//   "https://image.lexica.art/full_webp/67925b45-a967-4d47-9a9d-4a1bf6e9cc1c",
// ];

// const blurhashExamples = [
//   "L5H2EC=PM+yV0g-mq.wG9c010J}I",
//   "L9AB*A%L4nNL00oL%2t7x]oL%1R*",
//   "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
//   "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
//   "LGF5]+Yk^6#M1w5;0J8w]4#]nz#;",
//   "L6Pj0^i_.AyE_3t7t7R**0o#DgR4",
//   "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
//   "LGF5]+Yk^6#M1w5;0J8w]4#]nz#;",
// ];

// const makes = [
//   { name: "Toyota", image: imageUrls[0] },
//   { name: "Honda", image: imageUrls[1] },
//   { name: "Ford", image: imageUrls[2] },
//   { name: "BMW", image: imageUrls[3] },
//   { name: "Mercedes", image: imageUrls[4] },
//   { name: "Audi", image: imageUrls[5] },
//   { name: "Tesla", image: imageUrls[6] },
//   { name: "Nissan", image: imageUrls[7] },
// ];

// const models = [
//   // Toyota
//   { name: "Corolla", makeIndex: 0 },
//   { name: "Camry", makeIndex: 0 },
//   { name: "RAV4", makeIndex: 0 },
//   { name: "Prius", makeIndex: 0 },
//   // Honda
//   { name: "Civic", makeIndex: 1 },
//   { name: "Accord", makeIndex: 1 },
//   { name: "CR-V", makeIndex: 1 },
//   // Ford
//   { name: "Focus", makeIndex: 2 },
//   { name: "Fiesta", makeIndex: 2 },
//   { name: "Mustang", makeIndex: 2 },
//   // BMW
//   { name: "3 Series", makeIndex: 3 },
//   { name: "5 Series", makeIndex: 3 },
//   { name: "X5", makeIndex: 3 },
//   // Mercedes
//   { name: "C-Class", makeIndex: 4 },
//   { name: "E-Class", makeIndex: 4 },
//   { name: "S-Class", makeIndex: 4 },
//   // Audi
//   { name: "A4", makeIndex: 5 },
//   { name: "A6", makeIndex: 5 },
//   { name: "Q5", makeIndex: 5 },
//   // Tesla
//   { name: "Model 3", makeIndex: 6 },
//   { name: "Model S", makeIndex: 6 },
//   { name: "Model X", makeIndex: 6 },
//   // Nissan
//   { name: "Qashqai", makeIndex: 7 },
//   { name: "Leaf", makeIndex: 7 },
//   { name: "Micra", makeIndex: 7 },
// ];

// const modelVariants = [
//   // Toyota Corolla
//   { name: "SE", modelIndex: 0, yearStart: 2018, yearEnd: 2022 },
//   { name: "LE", modelIndex: 0, yearStart: 2018, yearEnd: 2022 },
//   { name: "XSE", modelIndex: 0, yearStart: 2020, yearEnd: 2023 },
//   { name: "Hybrid LE", modelIndex: 0, yearStart: 2020, yearEnd: 2023 },

//   // Toyota Camry
//   { name: "XLE", modelIndex: 1, yearStart: 2019, yearEnd: 2023 },
//   { name: "TRD", modelIndex: 1, yearStart: 2020, yearEnd: 2023 },
//   { name: "SE Nightshade", modelIndex: 1, yearStart: 2021, yearEnd: 2023 },
//   { name: "Hybrid XLE", modelIndex: 1, yearStart: 2019, yearEnd: 2023 },

//   // Honda Civic
//   { name: "EX", modelIndex: 4, yearStart: 2017, yearEnd: 2021 },
//   { name: "Touring", modelIndex: 4, yearStart: 2017, yearEnd: 2023 },
//   { name: "Si", modelIndex: 4, yearStart: 2020, yearEnd: 2023 },
//   { name: "Type R", modelIndex: 4, yearStart: 2017, yearEnd: 2023 },

//   // Ford Mustang
//   { name: "GT", modelIndex: 9, yearStart: 2015, yearEnd: 2023 },
//   { name: "EcoBoost", modelIndex: 9, yearStart: 2018, yearEnd: 2023 },
//   { name: "Mach 1", modelIndex: 9, yearStart: 2021, yearEnd: 2023 },
//   { name: "Shelby GT500", modelIndex: 9, yearStart: 2020, yearEnd: 2023 },

//   // BMW 3 Series
//   { name: "320i", modelIndex: 10, yearStart: 2019, yearEnd: 2023 },
//   { name: "330i", modelIndex: 10, yearStart: 2019, yearEnd: 2023 },
//   { name: "M340i", modelIndex: 10, yearStart: 2020, yearEnd: 2023 },
//   { name: "M3 Competition", modelIndex: 10, yearStart: 2021, yearEnd: 2023 },

//   // Tesla Model 3
//   { name: "Long Range", modelIndex: 18, yearStart: 2020, yearEnd: 2023 },
//   { name: "Performance", modelIndex: 18, yearStart: 2019, yearEnd: 2023 },
//   {
//     name: "Standard Range Plus",
//     modelIndex: 18,
//     yearStart: 2019,
//     yearEnd: 2022,
//   },

//   // Additional popular models
//   // Honda Accord
//   { name: "EX-L", modelIndex: 5, yearStart: 2018, yearEnd: 2023 },
//   { name: "Sport 2.0T", modelIndex: 5, yearStart: 2018, yearEnd: 2023 },

//   // Ford F-150
//   { name: "Lariat", modelIndex: 7, yearStart: 2018, yearEnd: 2023 },
//   { name: "Raptor", modelIndex: 7, yearStart: 2019, yearEnd: 2023 },

//   // Chevrolet Silverado
//   { name: "LTZ", modelIndex: 8, yearStart: 2019, yearEnd: 2023 },
//   { name: "High Country", modelIndex: 8, yearStart: 2020, yearEnd: 2023 },

//   // Audi A4
//   { name: "Premium Plus", modelIndex: 12, yearStart: 2020, yearEnd: 2023 },
//   { name: "S4", modelIndex: 12, yearStart: 2020, yearEnd: 2023 },

//   // Mercedes-Benz C-Class
//   { name: "AMG C 43", modelIndex: 13, yearStart: 2019, yearEnd: 2023 },
//   { name: "AMG C 63", modelIndex: 13, yearStart: 2019, yearEnd: 2023 },
// ];

// const firstNames = [
//   "James",
//   "Mary",
//   "John",
//   "Patricia",
//   "Robert",
//   "Jennifer",
//   "Michael",
//   "Linda",
//   "William",
//   "Elizabeth",
// ];
// const lastNames = [
//   "Smith",
//   "Johnson",
//   "Williams",
//   "Brown",
//   "Jones",
//   "Miller",
//   "Davis",
//   "Garcia",
//   "Rodriguez",
//   "Wilson",
// ];

// const carTitles = [
//   "Excellent condition with low mileage",
//   "Well-maintained family car",
//   "Sporty and fun to drive",
//   "Luxury vehicle with all options",
//   "Eco-friendly electric car",
//   "Reliable daily commuter",
//   "Spacious SUV for family trips",
//   "Premium sedan with great features",
// ];

// const carDescriptions = [
//   "This car has been meticulously maintained and is in excellent condition. It has low mileage and comes with a full service history. Perfect for someone looking for a reliable vehicle.",
//   "A great family car with plenty of space and comfort features. Regularly serviced and in very good condition both inside and out.",
//   "Sporty and fun to drive, this car offers great performance and handling. Well cared for with no accidents or damage.",
//   "Luxury vehicle with all the premium options you could want. Leather seats, navigation, premium sound system and more.",
//   "Eco-friendly electric car with great range and low running costs. Perfect for city driving and commuting.",
//   "Reliable daily commuter with good fuel economy and low maintenance costs. Great value for money.",
//   "Spacious SUV with plenty of room for the whole family and all your gear. Comfortable ride and great visibility.",
//   "Premium sedan with all the latest features and technology. Smooth ride and luxurious interior.",
// ];

// const colors = [
//   "BLACK",
//   "BLUE",
//   "BROWN",
//   "GOLD",
//   "GREEN",
//   "ORANGE",
//   "PINK",
//   "PURPLE",
//   "RED",
//   "SILVER",
//   "WHITE",
//   "YELLOW",
// ];
// const transmissions = ["MANUAL", "AUTOMATIC"];
// const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
// const bodyTypes = [
//   "SEDAN",
//   "HATCHBACK",
//   "SUV",
//   "COUPE",
//   "CONVERTIBLE",
//   "WAGON",
// ];
// const ulezCompliances = ["EXEMPT", "NON_EXEMPT"];
// const odoUnits = ["MILES", "KILOMETERS"];
// const currencies = ["GBP", "USD", "EUR"];
// const classifiedStatuses = ["LIVE", "DRAFT", "SOLD"];
// const customerStatuses = [
//   "INTERESTED",
//   "SUBSCRIBER",
//   "CONTACTED",
//   "PURCHASED",
//   "COLD",
// ];

// function getRandomElement(array) {
//   return array[Math.floor(Math.random() * array.length)];
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomDate(start, end) {
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

// function generateSlug(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// async function main() {
//   console.log("Starting seed...");

//   // Cleanup existing data (order matters due to FK constraints)
//   console.log("Cleaning up existing data...");
//   await prisma.image.deleteMany();
//   await prisma.customerLifeCycle.deleteMany();
//   await prisma.customer.deleteMany();
//   await prisma.classified.deleteMany();
//   await prisma.make.deleteMany();
//   await prisma.modelVariant.deleteMany();
//   await prisma.model.deleteMany();
//   await prisma.pageView.deleteMany();
//   await prisma.session.deleteMany();
//   await prisma.user.deleteMany();

//   // Create makes
//   console.log("Creating makes...");
//   const createdMakes = [];
//   for (const make of makes) {
//     const createdMake = await prisma.make.create({
//       data: {
//         name: make.name,
//         image: make.image,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//     createdMakes.push(createdMake);
//   }

//   // Create models
//   console.log("Creating models...");
//   const createdModels = [];
//   for (const model of models) {
//     const createdModel = await prisma.model.create({
//       data: {
//         name: model.name,
//         makeId: createdMakes[model.makeIndex].id,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//     createdModels.push(createdModel);
//   }

//   // Create model variants
//   console.log("Creating model variants...");
//   const createdModelVariants = [];
//   for (const variant of modelVariants) {
//     const createdVariant = await prisma.modelVariant.create({
//       data: {
//         name: variant.name,
//         modelId: createdModels[variant.modelIndex].id,
//         yearStart: variant.yearStart,
//         yearEnd: variant.yearEnd,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//     createdModelVariants.push(createdVariant);
//   }

//   // Create classifieds
//   console.log("Creating classifieds...");
//   const createdClassifieds = [];
//   for (let i = 0; i < 20; i++) {
//     const modelIndex = getRandomInt(0, createdModels.length - 1);
//     const model = createdModels[modelIndex];
//     const make = createdMakes[models[modelIndex].makeIndex];

//     // Get all variants for this model
//     const availableVariants = createdModelVariants.filter(
//       (v) => v.modelId === model.id
//       // console.log("v.modelId==>", v.modelId, "model Id", model.id);
//     );

//     // console.log("availableVariants==>", availableVariants);

//     // Ensure we have at least one variant (you might need to adjust your seed data)
//     if (availableVariants.length === 0) {
//       console.warn(`No variants found for model ${model.name}, skipping`);
//       continue;
//     }

//     // Always assign a variant (no null check needed)
//     const variant = getRandomElement(availableVariants);

//     const title = `${make.name} ${model.name}${
//       variant ? ` ${variant.name}` : ""
//     }`;
//     const slug = generateSlug(title) + "-" + getRandomInt(1000, 9999);

//     const classified = await prisma.classified.create({
//       data: {
//         views: getRandomInt(0, 500),
//         slug,
//         vrm: `${getRandomElement([
//           "AB",
//           "CD",
//           "EF",
//           "GH",
//           "JK",
//           "LM",
//           "NP",
//           "QR",
//           "ST",
//           "UV",
//         ])}${getRandomInt(10, 99)}${getRandomElement([
//           "ABC",
//           "DEF",
//           "GHJ",
//           "KLM",
//           "NPQ",
//           "RST",
//         ])}`,
//         title: `${title} - ${getRandomElement(carTitles)}`,
//         description: getRandomElement(carDescriptions),
//         year: getRandomInt(2015, 2023),
//         odoReading: getRandomInt(1000, 50000),
//         doors: getRandomInt(2, 5),
//         seats: getRandomInt(2, 7),
//         price: getRandomInt(5000, 50000),
//         make: {
//           connect: { id: make.id },
//         },
//         model: {
//           connect: { id: model.id },
//         },
//         modelVariant: {
//           connect: { id: variant.id },
//         },
//         ulezCompliance: getRandomElement(ulezCompliances),
//         transmission: getRandomElement(transmissions),
//         color: getRandomElement(colors),
//         fuelType: getRandomElement(fuelTypes),
//         bodyType: getRandomElement(bodyTypes),
//         odoUnit: getRandomElement(odoUnits),
//         current: getRandomElement(currencies),
//         status: getRandomElement(classifiedStatuses),
//         createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//         updatedAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//       },
//     });
//     createdClassifieds.push(classified);

//     // Create images for this classified
//     const imageCount = getRandomInt(3, 8);
//     const imageIndices = Array.from({ length: imageUrls.length }, (_, i) => i)
//       .sort(() => 0.5 - Math.random())
//       .slice(0, imageCount);

//     for (let j = 0; j < imageCount; j++) {
//       await prisma.image.create({
//         data: {
//           alt: `${title} - Image ${j + 1}`,
//           src: imageUrls[imageIndices[j]],
//           classifiedId: classified.id,
//           blurhash: getRandomElement(blurhashExamples),
//           isMain: j === 0,
//         },
//       });
//     }
//   }

//   // Create customers
//   console.log("Creating customers...");
//   const createdCustomers = [];
//   for (let i = 0; i < 30; i++) {
//     const firstName = getRandomElement(firstNames);
//     const lastName = getRandomElement(lastNames);
//     const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

//     const customer = await prisma.customer.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         mobile: `07${getRandomInt(100000000, 999999999)}`,
//         bookingDate:
//           Math.random() > 0.7
//             ? getRandomDate(new Date(2022, 0, 1), new Date())
//             : null,
//         termsAccepted: Math.random() > 0.5,
//         status: getRandomElement(customerStatuses),
//         classfiedId:
//           Math.random() > 0.5 ? getRandomElement(createdClassifieds).id : null,
//         createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//         updatedAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//       },
//     });
//     createdCustomers.push(customer);

//     // console.log("Customer ID =>", customer.id);
//     // Create lifecycle events for some customers

//     let previousStatus = customer.status;

//     const newStatus = getRandomElement(
//       customerStatuses.filter((s) => s !== previousStatus)
//     );

//     await prisma.customerLifeCycle.create({
//       data: {
//         customerId: customer.id,
//         oldStatus: previousStatus,
//         newStatus,
//         createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//         updatedAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//       },
//     });

//     previousStatus = newStatus;
//   }

//   // Create page views
//   console.log("Creating page views...");
//   for (let i = 0; i < 100; i++) {
//     await prisma.pageView.create({
//       data: {
//         path:
//           Math.random() > 0.7
//             ? `/classifieds/${getRandomElement(createdClassifieds).slug}`
//             : getRandomElement([
//                 "/",
//                 "/about",
//                 "/contact",
//                 "/terms",
//                 "/privacy",
//               ]),
//         viewedAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//         ipAddress: `${getRandomInt(1, 255)}.${getRandomInt(
//           0,
//           255
//         )}.${getRandomInt(0, 255)}.${getRandomInt(1, 255)}`,
//         userAgent: getRandomElement([
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//           "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
//           "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
//           "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
//         ]),
//         referrer:
//           Math.random() > 0.5
//             ? getRandomElement([
//                 "https://www.google.com/",
//                 "https://www.bing.com/",
//                 "https://www.yahoo.com/",
//                 "https://www.facebook.com/",
//                 "https://www.twitter.com/",
//                 "https://www.example.com/",
//               ])
//             : null,
//       },
//     });
//   }

//   // Create users
//   console.log("Creating users...");
//   await prisma.user.create({
//     data: {
//       email: "admin@example.com",
//       hashedpassword:
//         "$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQz6Z7z2VM.mV4L.uF7H7J2Qn/6O", // "password"
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   for (let i = 0; i < 5; i++) {
//     const firstName = getRandomElement(firstNames);
//     const lastName = getRandomElement(lastNames);
//     const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

//     await prisma.user.create({
//       data: {
//         email,
//         hashedpassword:
//           "$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQz6Z7z2VM.mV4L.uF7H7J2Qn/6O", // "password"
//         createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//         updatedAt: getRandomDate(new Date(2022, 0, 1), new Date()),
//       },
//     });
//   }

//   // Create sessions for users
//   console.log("Creating sessions...");
//   const users = await prisma.user.findMany();
//   for (const user of users) {
//     await prisma.session.create({
//       data: {
//         sessionToken: `session_token_${Math.random()
//           .toString(36)
//           .substring(2)}`,
//         userId: user.id,
//         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
//         requires2FA: Math.random() > 0.5,
//       },
//     });
//   }

//   console.log("Seed completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const slugify = require("slugify");

const prisma = new PrismaClient();

const imageUrls = [
  "https://image.lexica.art/full_webp/8fc3d13a-317a-4c15-a0f9-1ddbe6e00bef",
  "https://image.lexica.art/full_webp/4aaab2a0-8818-409d-8cc2-59930f23dfdb",
  "https://image.lexica.art/full_webp/030d861b-09c7-4ab4-9977-f9ec2eeb1228",
  "https://image.lexica.art/full_webp/264f24ad-9211-45b5-91c1-40a7851d96b6",
  "https://image.lexica.art/full_webp/96970bbb-ae24-482c-9784-6c95c106705a",
  "https://image.lexica.art/full_webp/b4d2c410-45c3-4577-925f-2fccc543cc7f",
  "https://image.lexica.art/full_webp/1f3973c0-ab64-431f-9036-8143e6975738",
  "https://image.lexica.art/full_webp/8d30a326-e709-450c-8c3b-6a5d9d98170b",
  "https://image.lexica.art/full_webp/0cc38f6f-7296-4f30-8db4-91b028977ec0",
  "https://image.lexica.art/full_webp/259c3003-eeae-4ecf-8ca6-8fbfa057ab1f",
  "https://image.lexica.art/full_webp/6d2c8273-579b-417b-8f16-6347530ac599",
  "https://image.lexica.art/full_webp/33e23568-7860-4915-a6a8-b6df36b50c71",
  "https://image.lexica.art/full_webp/848c0f23-e8ea-4240-b609-5847d3854e88",
  "https://image.lexica.art/full_jpg/3df579ef-65a9-4e76-837a-d63108f76b63",
  "https://image.lexica.art/full_jpg/5e614616-f773-4ec3-a360-ebc84dc374f1",
  "https://image.lexica.art/full_webp/224455d4-6473-4080-b2c1-e566e3892416",
  "https://image.lexica.art/full_webp/214c424c-182b-4377-b8c9-d80e00e789b6",
  "https://image.lexica.art/full_webp/02a50bed-a080-44dc-8e24-6838f1d0d43c",
  "https://image.lexica.art/full_webp/51119c2c-7922-4f9f-952f-ba9c1c80964e",
  "https://image.lexica.art/full_webp/17fb12f0-4b74-4982-99f7-d8e6b95a977c",
  "https://image.lexica.art/full_webp/67925b45-a967-4d47-9a9d-4a1bf6e9cc1c",
];

const blurhashValues = [
  "L9EVxt_4M{ay00WB~qj[4nof%MWB",
  "L5EOHs00~q%M?bD%s:ofIUM{t7xv",
  "L6P#00of~q-;IUt7WBayM{RjM{xu",
  "L9GcDl?bt7xu~qayD%M{M{IUM{of",
  "L4FY?U00_3t7~q%MWBay%Mxu?bof",
  "L5O;N1%M?boc00D%~q%MxuWBMxM{",
  "L7HLHo%M~qM{IUt7%MxuofRjxtR*",
  "L7J*UW?btRD%~qxuIUM{WBofxuWB",
  "L8FOQo_3~q-;ofxuM{xuIUWBWBRj",
  "L6IFkx00_3t7~qRjxufQayWBofay",
  "L5G@ax00_3D%4nxu~qWBayt7ofof",
  "LALz^n00xuxut7%MRjxuofRjWBM{",
];

// Sample car makes and models
const carMakes = [
  { name: "BMW", models: ["3 Series", "5 Series", "X5", "M3", "i8"] },
  {
    name: "Mercedes",
    models: ["C-Class", "E-Class", "S-Class", "GLE", "AMG GT"],
  },
  { name: "Audi", models: ["A3", "A4", "Q5", "R8", "e-tron"] },
  {
    name: "Porsche",
    models: ["911", "Cayenne", "Panamera", "Taycan", "Macan"],
  },
  {
    name: "Ferrari",
    models: ["F8 Tributo", "Roma", "SF90 Stradale", "812 Superfast"],
  },
  { name: "Lamborghini", models: ["Huracan", "Aventador", "Urus", "Gallardo"] },
  { name: "Jaguar", models: ["F-Type", "XF", "I-PACE", "F-PACE", "XE"] },
  { name: "Ford", models: ["Mustang", "Focus", "Fiesta", "Explorer", "F-150"] },
  {
    name: "Toyota",
    models: ["Corolla", "Camry", "RAV4", "Supra", "Land Cruiser"],
  },
  { name: "Honda", models: ["Civic", "Accord", "CR-V", "NSX", "Jazz"] },
];

// Helper function to generate a random VRM (Vehicle Registration Mark)
function generateRandomVRM() {
  const letters = "ABCDEFGHJKLMNOPRSTUVWXYZ";
  const getRandomLetter = () =>
    letters.charAt(Math.floor(Math.random() * letters.length));
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

  // Format: 2 letters, 2 digits, 3 letters (e.g., AB12 CDE)
  return `${getRandomLetter()}${getRandomLetter()}${getRandomDigit()}${getRandomDigit()} ${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}`;
}

// Main seed function
async function seed() {
  try {
    console.log("Starting database seeding...");

    // First, clear the database
    await clearDatabase();

    // Create makes
    const makesData = [];
    for (const make of carMakes) {
      const createdMake = await prisma.make.create({
        data: {
          name: make.name,
          image: faker.image.urlLoremFlickr({ category: "car" }),
        },
      });
      makesData.push({ ...createdMake, models: make.models });
    }

    console.log(`Created ${makesData.length} car makes`);

    // Create models for each make
    const modelsData = [];
    for (const make of makesData) {
      for (const modelName of make.models) {
        const createdModel = await prisma.model.create({
          data: {
            name: modelName,
            makeId: make.id,
          },
        });
        modelsData.push(createdModel);
      }
    }

    console.log(`Created ${modelsData.length} car models`);

    // Create model variants for each model
    const variantsData = [];
    for (const model of modelsData) {
      // Create 1-3 variants for each model
      const variantCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < variantCount; i++) {
        const yearStart = 2010 + Math.floor(Math.random() * 10);
        const yearEnd = yearStart + 3 + Math.floor(Math.random() * 5);

        const variant = await prisma.modelVariant.create({
          data: {
            name: faker.vehicle.type() + " " + faker.vehicle.fuel(),
            modelId: model.id,
            yearStart,
            yearEnd,
          },
        });

        variantsData.push(variant);
      }
    }

    console.log(`Created ${variantsData.length} model variants`);

    // Create 50+ classifieds
    const classifiedsCount = 55;
    const classifieds = [];

    // Define enum values directly since Prisma doesn't expose them as properties
    const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
    const bodyTypes = [
      "SEDAN",
      "HATCHBACK",
      "SUV",
      "COUPE",
      "CONVERTIBLE",
      "WAGON",
    ];
    const transmissions = ["MANUAL", "AUTOMATIC"];
    const colors = [
      "BLACK",
      "BLUE",
      "BROWN",
      "GOLD",
      "GREEN",
      "ORANGE",
      "PINK",
      "PURPLE",
      "RED",
      "SILVER",
      "WHITE",
      "YELLOW",
    ];
    const statuses = ["LIVE", "DRAFT", "SOLD"];
    const ulezComplianceTypes = ["EXEMPT", "NON_EXEMPT"];

    for (let i = 0; i < classifiedsCount; i++) {
      // Randomly select a model
      const randomModelIndex = Math.floor(Math.random() * modelsData.length);
      const selectedModel = modelsData[randomModelIndex];

      // Find the make for this model
      const selectedMake = makesData.find(
        (make) => make.id === selectedModel.makeId
      );

      // Find a variant for this model
      const modelVariants = variantsData.filter(
        (variant) => variant.modelId === selectedModel.id
      );
      const selectedVariant =
        modelVariants[Math.floor(Math.random() * modelVariants.length)];

      // Generate year within the range of the variant
      const year = faker.number.int({
        min: selectedVariant.yearStart,
        max: selectedVariant.yearEnd,
      });

      // Generate a title
      const title = `${year} ${selectedMake.name} ${selectedModel.name} ${selectedVariant.name}`;

      // Generate a slug
      const slug = slugify(`${title}-${faker.string.alphanumeric(6)}`, {
        lower: true,
      });

      // Create the classified
      const classified = await prisma.classified.create({
        data: {
          title,
          slug,
          vrm: generateRandomVRM(),
          description: faker.lorem.paragraphs(3),
          year,
          odoReading: faker.number.int({ min: 1000, max: 100000 }),
          doors: faker.number.int({ min: 2, max: 5 }),
          seats: faker.number.int({ min: 2, max: 8 }),
          price: faker.number.int({ min: 5000, max: 500000 }),
          makeId: selectedMake.id,
          modelId: selectedModel.id,
          modelVariantId: selectedVariant.id,
          ulezCompliance:
            ulezComplianceTypes[
              Math.floor(Math.random() * ulezComplianceTypes.length)
            ],
          transmission:
            transmissions[Math.floor(Math.random() * transmissions.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
          bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          views: faker.number.int({ min: 0, max: 1000 }),
        },
      });

      classifieds.push(classified);

      // Create 1-5 images for each classified
      const imageCount = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < imageCount; j++) {
        const isMain = j === 0; // First image is the main one
        await prisma.image.create({
          data: {
            alt: `${title} image ${j + 1}`,
            src: imageUrls[Math.floor(Math.random() * imageUrls.length)],
            classifiedId: classified.id,
            blurhash:
              blurhashValues[Math.floor(Math.random() * blurhashValues.length)],
            isMain,
          },
        });
      }

      // Create 0-3 customers for each classified
      const customerCount = Math.floor(Math.random() * 4);
      for (let k = 0; k < customerCount; k++) {
        const customerStatuses = [
          "INTERESTED",
          "SUBSCRIBER",
          "CONTACTED",
          "PURCHASED",
          "COLD",
        ];
        const customerStatus =
          customerStatuses[Math.floor(Math.random() * customerStatuses.length)];

        const customer = await prisma.customer.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            mobile: faker.phone.number(),
            bookingDate: Math.random() > 0.5 ? faker.date.future() : null,
            termsAccepted: Math.random() > 0.3,
            status: customerStatus,
            classfiedId: classified.id,
          },
        });

        // Create customer lifecycle
        await prisma.customerLifeCycle.create({
          data: {
            customerId: customer.id,
            oldStatus: "INTERESTED",
            newStatus: customerStatus,
          },
        });
      }
    }

    console.log(
      `Created ${classifieds.length} classified listings with images and customers`
    );

    // Create some page views
    const pageViewsCount = 200;
    for (let i = 0; i < pageViewsCount; i++) {
      await prisma.pageView.create({
        data: {
          path:
            Math.random() > 0.5
              ? "/"
              : `/classified/${
                  classifieds[Math.floor(Math.random() * classifieds.length)]
                    .slug
                }`,
          ipAddress: faker.internet.ipv4(),
          userAgent: faker.internet.userAgent(),
          referrer: Math.random() > 0.7 ? faker.internet.url() : null,
          viewedAt: faker.date.recent({ days: 30 }),
        },
      });
    }

    console.log(`Created ${pageViewsCount} page views`);

    // Create a test user
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        hashedpassword:
          "$2a$10$GzEo70YrxUXHI5FNZOr7aOiVmPrT4cCpnTG.sR7PGjoNCjXUFroEG", // password is "password"
      },
    });

    console.log("Created test user: admin@example.com (password: password)");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Function to clear existing data before seeding
async function clearDatabase() {
  console.log("Clearing existing database data...");

  const tablesToClear = [
    "CustomerLifeCycle",
    "Customer",
    "Image",
    "Classified",
    "ModelVariant",
    "Model",
    "Make",
    "PageView",
    "Session",
    "User",
  ];

  for (const table of tablesToClear) {
    try {
      const deleteCount = await prisma[table].deleteMany({});
      console.log(`Cleared ${table} table (${deleteCount.count} records)`);
    } catch (error) {
      console.warn(`Error clearing ${table} table:`, error.message);
    }
  }
}

// Run the seed function
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
