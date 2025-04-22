import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./users";
import { seedClassifieds } from "./classifiedseed";


// why seed?
// seed use to test the database for check
// i didn't complete this seed section bcz its take too much time . i check menualy all the model works great.

const prisma = new PrismaClient();

async function main() {
    console.log('test')
    //   await seedUsers();
    await seedClassifieds()

}

main().catch((e) => {
    throw e;
}).finally(async () => {
  await prisma.$disconnect();
});