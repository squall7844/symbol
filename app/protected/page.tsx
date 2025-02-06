import Link from "next/link";
import Price from "@/components/Price/Price";
import SignOut from "@/components/Session/SignOut";
import { ROUTES } from "@/components/Utility/URL";

const Home = async () => {
  return (
    <div className="h-full">
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
