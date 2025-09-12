import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col border p-4 h-full">
        <Outlet />
      </div>
    </div>
  );
}
