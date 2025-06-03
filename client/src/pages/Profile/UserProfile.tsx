/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function UserProfile() {
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);

  const globalUsername = useUserStore((state) => state.globalUsername);
  const globalEmail = useUserStore((state) => state.globalEmail);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isUserSignedIn) {
      navigate("/");
    }
  }, [isUserSignedIn]);

  return (
    <div className="relative flex flex-col items-center inset-0 pb-3 min-h-dvh outerDivBackgroundColour font-semibold component-x-axis-padding">
      <h1 className="text-white text-4xl pt-[6rem]">My Account</h1>
      <div className="innerDivBackgroundColour mt-6 p-6 rounded-2xl shadow-lg border border-white/10 w-1/2">
        <div className="text-white">
          <div>
            <h3 className="text-lg mb-1">Display Name</h3>
            <div className="font-normal text-white/90">{globalUsername ?? "No user"}</div>
          </div>
          <div>
            <h3 className="text-lg mb-1">Email</h3>
            <div className="font-normal text-white/90">{globalEmail}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
