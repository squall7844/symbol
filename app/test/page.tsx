import { auth } from "@/app/auth/auth";

export default async function test() {
  const session = await auth();
  return <div>welcome {session?.user?.name}!</div>;
}
