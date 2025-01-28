"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // signIn関数を使って認証を試みる
    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/test", // 認証成功後のリダイレクト先
      redirect: true, // 成功時に自動でリダイレクト
    });

    if (!result?.ok) {
      console.error("Login failed");
      alert("ログインに失敗しました。");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
