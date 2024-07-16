// "use client";
// import { GetChart } from "@/components/API/GetChart";
// // import Chart from "@/components/Chart";
// // import CreateFromPrivateKey from "@/components/Symbol/GetMosaic";
// import GenerateNewAccount from "@/components/Symbol/GenerateNewAccount";

// export default function test() {
//   return (
//     <div>
//       {/* <Chart /> */}
//       {/* <GenerateNewAccount /> */}
//       {/* <CreateFromPrivateKey /> */}
//     </div>
//   );
// }

// pages/index.tsx
"use client";
import Register from "@/components/Login/register";
// import ViewMosaic from "@/components/Mosaic";
import ViewChart from "@/components/ViewChart";
import Chart from "@/components/ViewChart";
import axios from "axios";
import { useState } from "react";
import { Mosaic } from "symbol-sdk";

const Home = () => {
  const [count, setCount] = useState<number>(0);
  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      {/* <Register />
      <div>カウンター</div>
      <div>{count}</div>
      <button onClick={addCount}>＋1</button> */}

      <ViewChart />
    </div>
  );
};

export default Home;
