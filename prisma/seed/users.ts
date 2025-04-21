import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
  { hashedpassword: "Alice", email: "alice@example.com" },
  { hashedpassword: "Bob", email: "bob@example.com" },
  { hashedpassword: "Alice2", email: "alice2@example.com" } // ✅ now it's unique
];


  await prisma.user.createMany({
    data: users,
  });

  console.log(`🌱 Seeded ${users.length} users`);
}
