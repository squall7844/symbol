import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Seed() {
  // ユーザーデータを作成
  const newUser = await prisma.user.create({
    data: {
      email: "example5@example.com",
      password: "password55",
      name: "test",
      xym_public_key: "public_key",
      amount: "100",
    },
  });
  console.log(newUser);

  // データベース接続を切断
  await prisma.$disconnect();
}

Seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

export default Seed;
