"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [DbData, setDbData] = useState<any>(null);
  // DB情報を取得する
  const fetchDBData = () => {
    axios.get("/api/GetDB").then((response) => {
      setDbData(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchDBData();
  }, []);

  return (
    <div>
      <ul>
        {DbData &&
          DbData.allPosts.map((post: any) => (
            <li key={post.id} className="p-3 m-3">
              {post.id}:{post.email}:{post.password}
              {post.name}
              {post.xym_public_key}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Test;
