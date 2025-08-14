/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserProfileMenu from "./menu/UserProfileMenu";
import { useAuthStore } from "../../store/authStore";

export default function UserProfile() {
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isUserSignedIn) {
      navigate("/");
    }
  }, [isUserSignedIn]);

  return (
    <div className="relative outerDivBackgroundColour min-h-dvh">
      <div className={`flex flex-col md:flex-row`}>
        <UserProfileMenu />
        <Outlet />
      </div>
    </div>
  );
}
