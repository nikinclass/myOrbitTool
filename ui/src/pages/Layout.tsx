import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col border p-4 h-full">
        <Outlet />
      </div>
    </div>
  );
}
