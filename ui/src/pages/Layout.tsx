import { Controls } from "@/components/Controls";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col h-full relative">
        <Header />
        <Controls />
        <Outlet />
      </div>
    </div>
  );
}
