import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-20 justify-center mt-20">
      <h1 className="text-white text-4xl text-center">You got lost</h1>
      <span className="mx-auto">
        <Link to={"/"} className="text-white text-3xl underline md:no-underline md:hover:underline">Go back to home</Link>
      </span>
    </div>
  );
}
