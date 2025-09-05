import { Link } from "react-router-dom";

export function NoPage() {
  return (
    <>
      <h1>404 Page</h1>
      <div className="flex flex-col border p-4 bg-green-500">
        <p>Page not found </p>
        <Link
          className="bg-black text-white w-fit rounded-full p-4 cursor-pointer"
          to="/"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
