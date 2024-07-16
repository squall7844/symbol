import { useTheme } from "next-themes";

interface ChageThemeProps {
  className?: string;
}
export function ChageTheme(props: ChageThemeProps) {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-row space-x-1">
      <button
        onClick={() => {
          setTheme("light");
        }}
        className="py-1 px-2 border-2 rounded-md"
      >
        light
      </button>
      <button
        onClick={() => {
          setTheme("dark");
        }}
        className="py-1 px-2 border-2 rounded-md"
      >
        dark
      </button>
      <button
        onClick={() => {
          setTheme("system");
        }}
        className="py-1 px-2 border-2 rounded-md"
      >
        system
      </button>
    </div>
  );
}
