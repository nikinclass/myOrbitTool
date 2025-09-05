import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1>Layout</h1>
      <div className="flex flex-col border p-4 bg-cyan-500 h-full">
        <Header className="bg-red-500" />
        <Outlet />
      </div>
    </div>
  );
}
