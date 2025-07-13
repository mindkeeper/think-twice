// prisma/seed.js
// Load environment variables from .env file. This must be the very first import.
import "dotenv/config";

// Import PrismaClient from the specified output path in your schema.prisma.
// Ensure this path matches the 'output' setting in your 'generator client' block.
import { PrismaClient } from "../src/generated/prisma/index.js";

// Create a new instance of PrismaClient to interact with the database.
const prisma = new PrismaClient();

// The main seeding function.
async function main() {
  console.log("Starting database seeding...");

  // 1. Seed a Mock User
  let mockUser = await prisma.user.findUnique({
    where: { id: "mock-user-123" },
  });

  if (!mockUser) {
    mockUser = await prisma.user.create({
      data: {
        id: "mock-user-123",
        email: "mock@example.com",
        name: "Mock User",
      },
    });
    console.log(`✅ Created mock user: ${mockUser.name} (ID: ${mockUser.id})`);
  } else {
    console.log(
      `⚠️ Mock user already exists: ${mockUser.name} (ID: ${mockUser.id})`
    );
  }

  // 2. Seed Common Categories
  const categoriesToCreate = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Books",
    "Sports",
    "Food & Beverages",
    "Health & Beauty",
    "Automotive",
    "Services",
  ];

  for (const categoryName of categoriesToCreate) {
    const categorySlug = categoryName.toLowerCase().replace(/\s/g, "-");

    const existingCategory = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!existingCategory) {
      const newCategory = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categorySlug,
        },
      });
      console.log(
        `✅ Created category: ${newCategory.name} (Slug: ${newCategory.slug})`
      );
    } else {
      console.log(`⚠️ Category "${categoryName}" already exists.`);
    }
  }

  console.log("Database seeding finished.");
}

// Execute the main seeding function.
main()
  .catch((e) => {
    console.error("❌ Database seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
