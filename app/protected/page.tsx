import Header from "@/components/Header/Header";
import { ThemeSwitch } from "@/components/Theme/ThmeSwitch";
import Price from "@/components/Price/Price";

import Link from "next/link";

import { ROUTES } from "@/components/Utility/URL";
import Response from "@/components/Utility/Response";

const Home = () => {
  return (
    <div className="h-full">
      <Response />
      <Header />
      <ThemeSwitch />
      <Price />
      <Link className="text-center mb-14" href={ROUTES.TEST}>
        testページ
      </Link>
      <Link className="text-center mb-14" href={ROUTES.DETAILS}>
        設定ページ
      </Link>
    </div>
  );
};

export default Home;
