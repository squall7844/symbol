import Header from "@/components/Header/Header";
import { ThemeSwitch } from "@/components/Theme/ThmeSwitch";
import Price from "@/components/Price/Price";
import Response from "@/components/Responsive/Response";
import Link from "next/link";
import SignOut from "@/components/Auth/SignOut";
import { ROUTES } from "@/components/Route/URL";

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
      <SignOut />
    </div>
  );
};

export default Home;
