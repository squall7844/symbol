"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData {
  id: number;
  harvest?: number;
  amount?: number;
}

const UserUpdate: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ id: 1 });
  const [message, setMessage] = useState<string>("");
  // const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.put("/api/getDB", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("更新が成功しました");
      console.log("Updated user:", response.data);

      // Updated navigation options
      // router.refresh(); // Use this to refresh the current page
      // or
      // router.push('/user-profile'); // Use this to navigate to a new page
    } catch (error) {
      setMessage("エラーが発生しました: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>ユーザー情報更新</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="harvest">収穫量:</label>
          <input
            type="number"
            id="harvest"
            name="harvest"
            value={userData.harvest || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="amount">金額:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={userData.amount || ""}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">更新</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserUpdate;
