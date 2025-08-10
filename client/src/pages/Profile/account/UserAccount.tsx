import Button from "../../../components/ui/Button/Button";
import { useAuthStore } from "../../../store/authStore";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import ProfileContentContainer from "../container/ProfileContentContainer";
import * as React from "react";
import { useCartStore } from "../../../store/cartStore";

export default function UserAccount() {
  const globalUsername = useUserStore((state) => state.globalUsername);
  const globalEmail = useUserStore((state) => state.globalEmail);

  const isJWTChecked = useAuthStore((state) => state.isJWTChecked);
  const userSignedOut = useAuthStore((state) => state.userSignedOut);
  const setIsJWTChecked = useAuthStore((state) => state.setIsJWTChecked);

  const clearCart = useCartStore((state) => state.clearCart);

  const [isEmailRevealed, setIsEmailRevealed] = React.useState<boolean>(false);
  const [editedUsernameValue, setEditedUsernameValue] = React.useState<string | null>(null);
  const [updateNameError, setUpdateNameError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  function handleLogOut(): void {
    localStorage.removeItem("token");
    setIsJWTChecked(false);
    userSignedOut();
    clearCart();
    navigate("/");
  }

  function modifiedEmail(email: string): string {
    if (isEmailRevealed) {
      return email;
    }
    const index = email.indexOf("@");
    return "*****" + email.substring(index);
  }

  return (
    <>
      {/**
       * `isLoading` is passed as the *inverse* of `isJWTChecked`, because:
       * - `isJWTChecked = false` means the token is still verifying, so the Loader should be displayed.
       * - `isJWTChecked = true` means the token is done verifying, so the content should be displayed.
       *
       * If we passed `isJWTChecked` directly, the logic would be reversed (loader would show after verification).
       *
       * See `ProfileContentContainer` to make this more clear.
       */}
      <ProfileContentContainer title="My Account" isLoading={!isJWTChecked}>
        <div className="innerDivBackgroundColour p-6 rounded-2xl shadow-lg border border-white/10 w-1/2">
          <div className="flex flex-col gap-7 text-white">
            <div>
              <h3 className="text-lg mb-1">Username</h3>
              <div className="flex justify-between items-center">
                {
                  editedUsernameValue != null ?
                    (
                      <>
                        <div className="flex flex-col">
                          <input
                            value={editedUsernameValue}
                            autoFocus
                            className={`outline-none bg-transparent text-white border-b-2 
                              ${updateNameError ? "border-red-600" : "border-white"}`
                            }
                            onChange={(e) => {
                              setUpdateNameError(null);
                              if (e.target.value === "") {
                                setUpdateNameError("Username cannot be empty");
                              }
                              setEditedUsernameValue(e.target.value)
                            }}
                          />
                          {updateNameError && <span className="text-[13px] text-red-600">{updateNameError}</span>}
                        </div>
                        <div className="flex gap-4 items-center">
                          <Button
                            textValue="Save"
                            className="py-1 h-[50%] w-[100px] border-2 hover:bg-white hover:text-black"
                          />
                          <Button
                            textValue="Cancel"
                            className="py-1 h-[50%] w-[100px] border-2 hover:bg-white hover:text-black"
                            onClick={() => setEditedUsernameValue(null)}
                          />
                        </div>
                      </>
                    ) :
                    (
                      <>
                        <div className="font-normal text-white/90">{globalUsername ?? "No username"}</div>
                        <Button
                          textValue="Edit"
                          className="border-2 border-white py-1 hover:bg-white hover:text-black w-[100px]"
                          onClick={() => setEditedUsernameValue(globalUsername)}
                        />
                      </>
                    )
                }
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-1">Email</h3>
              <div className="flex justify-between items-center">
                <div className="font-normal text-white/90">{modifiedEmail(globalEmail)}</div>
                <Button
                  textValue={isEmailRevealed ? "Hide" : "Show"}
                  className="border-2 border-white py-1 hover:bg-white hover:text-black w-[100px]"
                  onClick={() => setIsEmailRevealed(!isEmailRevealed)}
                />
              </div>
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
      </ProfileContentContainer>
    </>
  );
}
