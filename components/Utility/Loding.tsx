import Image from "next/image";

interface LoadingProps {
  loading: boolean;
  onClick: () => void;
}

const Loding = ({ loading, onClick }: LoadingProps) => {
  return (
    <button onClick={onClick}>
      {loading ? (
        <div className="flex">
          <Image src="/loading.svg" alt="loading..." width={64} height={64} />
          Loading...
        </div>
      ) : (
        <Image src="/reload.svg" alt="reload..." width={64} height={64} />
      )}
    </button>
  );
};

export default Loding;
