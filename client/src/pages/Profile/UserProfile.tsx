/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserProfileMenu from "./menu/UserProfileMenu";
import { useAuthStore } from "../../store/authStore";

export default function UserProfile() {
  const isJWTChecked = useAuthStore((state) => state.isJWTChecked);
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isUserSignedIn && isJWTChecked) {
      navigate("/");
    }
  }, [isUserSignedIn]);

  return (
    <div className="relative min-h-dvh outerDivBackgroundColour">
      <div className="pt-[73px] flex">
        <UserProfileMenu />
        <Outlet />
      </div>
    </div>
  );
}
