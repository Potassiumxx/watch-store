import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div
        className="flex justify-between text-white border-t-[1px] border-white/[.5] outerDivBackgroundColour px-4 py-8 lg:pt-[80px] lg:pb-11 lg:component-x-axis-padding"
        data-testid="footer">
        <h1 className="uppercase md:text-[18px] font-semibold">Watch Store</h1>
        <ul className="flex flex-col gap-2 md:gap-5 md:gap-5 font-semibold md:text-[18px] md:flex-row">
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={"products"}>Products</Link>
          </li>
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={"https://github.com/Potassiumxx/watch-store"} target="_blank">Repository</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
