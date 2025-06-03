import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";
import * as React from "react";
import { useAuthStore } from "./store/authStore";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "./store/userStore";
import { DecodedJWT } from "./types/form";

function App() {
  const userSignedIn = useAuthStore((state) => state.userSignedIn);
  const setIsJWTChecked = useAuthStore((state) => state.setIsJWTChecked);

  const setGlobalUsername = useUserStore((state) => state.setGlobalUsername);
  const setGlobalEmail = useUserStore((state) => state.setGlobalEmail);

  /**
   * Decode the JWT stored in local storage on initial render.
   *
   * Checks if the user was signed in or not depending on if JWT exists or not.
   *
   * **JWT: JSON Web Token**
   */
  function decodeJWT() {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      const decodedToken: DecodedJWT = jwtDecode(jwtToken);
      userSignedIn();
      setGlobalUsername(decodedToken.username);
      setGlobalEmail(decodedToken.email);
    }

    setIsJWTChecked(true);
  }

  React.useEffect(() => {
    decodeJWT();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-dvh mt-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
