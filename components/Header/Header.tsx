"use client";
import Image from "next/image";
import Response from "../Utility/Response";
import { ThemeSwitch } from "../Theme/ThmeSwitch";

const Header = () => {
  return (
    <div>
      <div className="flex text-left text-3xl font-serif p-5">
        <Image
          src="/symbol.webp"
          alt="XYM"
          width={32}
          height={32}
          className="animate-pulse mr-5"
        />
        XYMBOL 残高確認アプリ
        <ThemeSwitch />
        <Response />
      </div>
    </div>
  );
};

export default Header;
