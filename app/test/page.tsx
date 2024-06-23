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
// import ViewMosaic from "@/components/Mosaic";
import ViewChart from "@/components/ViewChart";
import Chart from "@/components/ViewChart";
import axios from "axios";
import { useState } from "react";
import { Mosaic } from "symbol-sdk";

const Home = () => {
  return (
    <div>
      <div className="w-1/2">test</div>
      <div className="w-1/2">
        <ViewChart />
      </div>
    </div>
  );
};

export default Home;
