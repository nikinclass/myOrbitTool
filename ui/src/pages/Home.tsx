import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <div className="flex flex-col border p-4 bg-green-500">
        <div id="cesiumContainer" className="fullSize"></div>
        <Link
          className="bg-black text-white w-fit rounded-full p-4 cursor-pointer"
          to="/I-do-not-exist"
        >
          Go to 404
        </Link>
      </div>
    </>
  );
}
