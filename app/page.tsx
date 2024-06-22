import Price from "@/components/Price";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-black via-slate-800 to-indigo-950  neon-text-blue ">
      <div className="flex text-left text-3xl font-serif p-5">
        <Image
          src="/symbol.webp"
          alt="XYM"
          width={48}
          height={48}
          className="animate-pulse mr-5"
        />
        XYMBOL 残高確認アプリ
      </div>
      <Price />
      <Link className="text-center mb-14" href="/test">
        testページ
      </Link>
    </div>
  );
}
