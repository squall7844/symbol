import prisma from "@/app/lib/prisma";

async function Seed() {
  const response = await Promise.all([
    prisma.$executeRawUnsafe(`TRUNCATE TABLE user CASCADE;`),
    prisma.user.createMany({
      data: [
        {
          id: 2,
          email: "hoge1",
          password: "testdesuyo!",
          name: "testhogea",
          xym_public_key: "tettetetetetetetet",
        },
        {
          id: 3,
          email: "hoge2",
          password: "testdesuyo!",
          name: "testhoge2",
          xym_public_key: "tettetetetetetetet",
        },
        {
          id: 4,
          email: "hoge3",
          password: "testdesuyo!",
          name: "testhoge3",
          xym_public_key: "tettetetetetetetet",
        },
        {
          id: 4,
          email: "hoge4",
          password: "testdesuyo!",
          name: "testhoge4",
          xym_public_key: "tettetetetetetetet",
        },
      ],
    }),
  ]);
  console.log(response);
}
Seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
