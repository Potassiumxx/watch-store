/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";
import { useUIStore } from "./store/uiStore";
import * as React from "react";
import { useAuthStore } from "./store/authStore";
import { useUserStore } from "./store/userStore";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "./types/authType";

function App() {
  const navbarHeight = useUIStore((state) => state.navbarHeight);

  const userSignedIn = useAuthStore((state) => state.userSignedIn);
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);
  const setIsJWTChecked = useAuthStore((state) => state.setIsJWTChecked);

  const globalUsername = useUserStore((state) => state.globalUsername);
  const setGlobalUsername = useUserStore((state) => state.setGlobalUsername);
  const setGlobalEmail = useUserStore((state) => state.setGlobalEmail);
  const setRole = useUserStore((state) => state.setRole);
  const setUserID = useUserStore((state) => state.setUserID);

  React.useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      const decodedToken: DecodedJWT = jwtDecode(jwtToken);
      userSignedIn();
      setGlobalUsername(decodedToken.username);
      setGlobalEmail(decodedToken.email);
      setRole(decodedToken.role);
      setUserID(decodedToken.sub);
    }
    setIsJWTChecked(true);
  }, [isUserSignedIn, globalUsername]);
  return (
    <>
      <Navbar />
      <div className="min-h-dvh outerDivBackgroundColour" style={{ paddingTop: `${navbarHeight ?? 121}px` }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
