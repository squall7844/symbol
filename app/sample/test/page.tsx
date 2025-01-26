import Link from "next/link";

const test = () => {
  return (
    <div className="p-5">
      <Link className="p-5" href="/api/GetCoins">
        GetXym
      </Link>
      <Link className="p-5" href="/api/GetPrice">
        GetPrice
      </Link>
      <Link className="p-5" href="/api/GetDB">
        GetDB
      </Link>
      <Link className="p-5" href="/api/GetChart">
        GetChart
      </Link>
      <Link className="p-5" href="/">
        Home
      </Link>
    </div>
  );
};

export default test;
