"use client";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      {" "}
      <div className="flex text-left text-3xl font-serif p-5">
        <Image
          src="/symbol.webp"
          alt="XYM"
          width={32}
          height={32}
          className="animate-pulse mr-5"
        />
        XYMBOL 残高確認アプリ
      </div>
    </div>
  );
};

export default Header;
