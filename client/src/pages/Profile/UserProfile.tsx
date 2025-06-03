/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isUserSignedIn) {
      navigate("/");
    }
  }, [isUserSignedIn]);

  return (
    <div>
      <h1>User</h1>
    </div>
  );
}
