import { Link } from "react-router-dom";

export function NoPage() {
  return (
    <>
      <div className="flex flex-col border p-4">
        <p>Page not found </p>
        <Link
          className="text-white w-fit rounded-full p-4 cursor-pointer"
          to="/"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
