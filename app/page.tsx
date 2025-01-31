import Link from "next/link";

const TopPage = () => {
  return (
    <div className="text-center">
      <div className="">
        <div>Hellow World</div>
        <div>TOP PAGE</div>
      </div>
      <Link className="" href="/login">
        LOGIN
      </Link>
    </div>
  );
};

export default TopPage;
