// Run the File below The Commend
// node ./prisma/seed/seed.ts

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
    const CurrencyCode = ["GBP", "USD", "EUR"];

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

      // Generate Random CurrencyCode
      const CurrencyStatus =
        CurrencyCode[Math.floor(Math.random() * CurrencyCode.length)];

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
          currency: CurrencyStatus,
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
