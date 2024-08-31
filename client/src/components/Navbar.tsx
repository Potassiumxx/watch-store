import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between px-7 py-7 items-center">
      <div>
        <Link to={"/"}>
          <img alt="logo" />
        </Link>
      </div>
      <div className="flex gap-2 bg-black text-white rounded-[25px] min-h-[3.2rem] items-center">
        <span className="navbar-link-style border-r-2">
          <Link to={"/"} className="navbar-link-padding">
            Home
          </Link>
        </span>
        <span className="navbar-link-style border-r-2">
          <Link to={"products"} className="navbar-link-padding">
            Collection
          </Link>
        </span>
        <span className="navbar-link-style">
          <Link to={"about"} className=" navbar-link-padding">
            About Us
          </Link>
        </span>
      </div>
      <div className="flex w-28 items-center justify-center gap-4">
        <span>Search</span>
        <span>Cart</span>
      </div>
    </div>
  );
}
