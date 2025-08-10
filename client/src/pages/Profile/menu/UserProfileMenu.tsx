import { NavLink } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { ROLES } from "../../../utils/constants";

export default function UserProfileMenu() {
  const role = useUserStore((state) => state.role);

  return (
    <div
      className="flex align-middle min-h-dvh w-[20%] innerDivBackgroundColour"
      style={{
        boxShadow: "8px -10px 10px 4px rgb(0, 0, 0, 0.9)",
      }}
    >
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
          to={"orders"}
          end
          className={({ isActive }) => {
            return isActive
              ? "w-full text-center duration-200 py-2 bg-white/[.95] text-black font-bold"
              : "w-full text-center duration-200 py-2 hover:bg-white hover:text-black";
          }}>
          View Order
        </NavLink>
        {role === ROLES.ADMIN
          && (
            <>
              < NavLink
                to={"add-product"}
                className={({ isActive }) => {
                  return isActive
                    ? "w-full text-center duration-200 py-2 bg-white/[.95] text-black font-bold"
                    : "w-full text-center duration-200 py-2 hover:bg-white hover:text-black";
                }}>
                Add Product
              </NavLink>
              <NavLink to={"product-category"}
                className={({ isActive }) => {
                  return isActive
                    ? "w-full text-center duration-200 py-2 bg-white/[.95] text-black font-bold"
                    : "w-full text-center duration-200 py-2 hover:bg-white hover:text-black";
                }}>
                Manage Product Category
              </NavLink>
            </>
          )
        }
      </div>
    </div >
  );
}
