import { NavLink } from "react-router-dom";

export default function UserProfileMenu() {
  return (
    <div className="flex align-middle min-h-dvh w-[20%] innerDivBackgroundColour shadow-md shadow-white/50">
      <div className="flex flex-col gap-10 w-full items-center text-white pt-4">
        <NavLink
          to={"."}
          end
          className={({ isActive }) => {
            return isActive
              ? "w-full text-center duration-200 py-2 bg-white/[.95] text-black font-bold"
              : "w-full text-center duration-200 py-2 hover:bg-white hover:text-black";
          }}>
          My Account
        </NavLink>
        <NavLink
          to={"product-management"}
          className={({ isActive }) => {
            return isActive
              ? "w-full text-center duration-200 py-2 bg-white/[.95] text-black font-bold"
              : "w-full text-center duration-200 py-2 hover:bg-white hover:text-black";
          }}>
          Products
        </NavLink>
      </div>
    </div>
  );
}
