import Price from "@/components/Price";
import { Response } from "@/components/Response";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <Response />
      <Price />
      <Link className="text-center mb-14" href="/test">
        testページ
      </Link>
    </div>
  );
}
