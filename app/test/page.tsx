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
import ViewChart from "@/components/ViewChart";
import Chart from "@/components/ViewChart";

const Home = () => {
  return (
    <div>
      <ViewChart />
    </div>
  );
};

export default Home;
