"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/components/Route/URL";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("ログインに失敗しました。");
    } else {
      router.push(ROUTES.MAIN);
    }
  };

  const renderError = () => error && <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ログイン</h1>
      {renderError()}
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <InputField
          label="ユーザー名:"
          type="text"
          value={username}
          onChange={setUsername}
        />
        <InputField
          label="パスワード:"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

export default Login;
