import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div
        className="flex justify-between component-x-axis-padding pt-[80px] pb-11 text-white border-t-[1px] border-white/[.5] outerDivBackgroundColour"
        data-testid="footer">
        <h1 className="uppercase text-[18px] font-semibold">Watch Store</h1>
        <ul className="flex gap-5 font-semibold text-[18px]">
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={"products"}>Products</Link>
          </li>
          <li className="hover:opacity-50 hover:underline duration-100">
            <Link to={""}>Repository</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
