/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";

export default function UserProfile() {
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);
  const userSignedOut = useAuthStore((state) => state.userSignedOut);
  const setIsJWTChecked = useAuthStore((state) => state.setIsJWTChecked);
  const isJWTChecked = useAuthStore((state) => state.isJWTChecked);

  const globalUsername = useUserStore((state) => state.globalUsername);
  const globalEmail = useUserStore((state) => state.globalEmail);

  const navigate = useNavigate();

  function handleLogOut(): void {
    localStorage.removeItem("token");
    setIsJWTChecked(false);
    userSignedOut();
    navigate("/");
  }

  React.useEffect(() => {
    if (!isUserSignedIn && isJWTChecked) {
      navigate("/");
    }
  }, [isUserSignedIn]);

  return (
    <div className="relative flex flex-col items-center inset-0 pb-3 min-h-dvh outerDivBackgroundColour font-semibold component-x-axis-padding">
      <h1 className="text-white text-4xl pt-[7rem]">My Account</h1>
      {!isJWTChecked ? (
        <Loader size={20} className="m-auto border-white" />
      ) : (
        <>
          <div className="innerDivBackgroundColour mt-20 p-6 rounded-2xl shadow-lg border border-white/10 w-1/2">
            <div className="flex flex-col gap-7 text-white">
              <div>
                <h3 className="text-lg mb-1">Display Name</h3>
                <div className="font-normal text-white/90">{globalUsername ?? "No user"}</div>
              </div>
              <div>
                <h3 className="text-lg mb-1">Email</h3>
                <div className="font-normal text-white/90">{globalEmail}</div>
              </div>
              <div className="flex justify-end border-t-2 border-t-white/20 mt-20">
                <Button
                  textValue="Log Out"
                  onClick={handleLogOut}
                  className="defaultButtonStyle bg-red-600 w-[100px] mt-5 text-[10px] hover:bg-red-800 hover:text-white focus:bg-red-800 focus:text-white"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
