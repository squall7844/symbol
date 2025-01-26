import { useSession, signOut } from "next-auth/react";

export default function SessionStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <p>Not signed in</p>
    </div>
  );
}
