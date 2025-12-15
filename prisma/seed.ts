import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("demo123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@clinicare.fr" },
    update: {},
    create: {
      email: "demo@clinicare.fr",
      password: hashedPassword,
      name: "Marie Demo",
      role: "ASSISTANT",
      xpPoints: 1250,
      streak: 7,
    },
  });

  console.log("Utilisateur de démo créé:", demoUser.email);

  const adminPassword = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@clinicare.fr" },
    update: {},
    create: {
      email: "admin@clinicare.fr",
      password: adminPassword,
      name: "Admin CliniCare",
      role: "ADMIN",
      xpPoints: 5000,
      streak: 30,
    },
  });

  console.log("Utilisateur admin créé:", adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
