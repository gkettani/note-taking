import { prisma } from "../src/server/db/client";

async function main() {
  await prisma.note.create({
    data: {
      id: "123456789",
      title: "My first note",
      content: "This is my first note",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
