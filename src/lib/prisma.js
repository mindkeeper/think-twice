import { PrismaClient } from "../generated/prisma";

let prisma;

if (process.env.NODE_ENV === "production") {
  // In production, always create a new PrismaClient instance.
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to reuse the instance across hot-reloads.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
