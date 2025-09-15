import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { useTheme } from "./theme-provider";

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const lightMode = theme === "light";

  return (
    <Link
      to="/"
      className={`flex justify-evenly items-center gap-2 select-none ${
        className ?? ""
      }`}
    >
      <img
        className="h-full aspect-square select-none"
        src={lightMode ? logo : logoDark}
        alt="myOrbitTool Logo"
      />
      <h1 className="text-primary text-lg font-bold">myOrbitTool</h1>
    </Link>
  );
}
