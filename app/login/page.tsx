"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/components/Utility/URL";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
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

  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl font-bold">ログイン</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="inline-block text-left">
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
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default Login;
