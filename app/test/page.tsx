import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function TestPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>
          You must be logged in to view this page. Please{" "}
          <a href="/login">log in</a>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
