import Header from "@/components/Header/Header";
import { ThemeSwitch } from "@/components/Theme/ThmeSwitch";
import Price from "@/components/Price/Price";
import Response from "@/components/Responsive/Response";
import Link from "next/link";

const Home = () => {
  return (
    <div className="h-full">
      <Response />
      <Header />
      <ThemeSwitch />
      <Price />
      <Link className="text-center mb-14" href="/test">
        testページ
      </Link>
      <Link className="text-center mb-14" href="/details">
        設定ページ
      </Link>
    </div>
  );
};

export default Home;
