/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserProfileMenu from "./menu/UserProfileMenu";
import { useAuthStore } from "../../store/authStore";
import Loader from "../../components/ui/Loader/Loader";

export default function UserProfile() {
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);
  /**
   * State to check if zustand has finished checking the localstorage and has updated the states according to the localstorage values or not.
   * The purpose is to not load the page unless it has finished doing the above and show Loader until then.
   *
   * Once it finishes doing those tasks above, update the states causing re-render and finally loading the page.
   */
  const [hasHydrated, setHasHydrated] = React.useState<boolean>(() => useAuthStore.persist.hasHydrated());

  const navigate = useNavigate();

  React.useEffect(() => {
    return useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
  }, []);

  React.useEffect(() => {
    if (hasHydrated && !isUserSignedIn) {
      navigate("/");
    }
  }, [isUserSignedIn, hasHydrated]);

  if (!hasHydrated) return <Loader />;

  return (
    <div className="relative outerDivBackgroundColour min-h-dvh">
      <div className={`flex flex-col md:flex-row`}>
        <UserProfileMenu />
        <Outlet />
      </div>
    </div>
  );
}
