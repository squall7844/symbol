import { signIn } from "@/app/auth/auth";

const Login = () => {
  return (
    <form
      action={async (FormData) => {
        "use server";
        await signIn("credentials", FormData);
      }}
    >
      <label htmlFor="">
        Email
        <input type="text" />
      </label>
      <label htmlFor="">
        Password
        <input type="password" />
      </label>
      <button>Sing IN</button>
    </form>
  );
};

export default Login;
