import { useAuthStore } from "../../../store/authStore";
import { loginUser } from "../../../services/api/authAPI";
import { errorHandler, applyFieldErrors } from "../../../utils/errorHandler";
import { LoginErrors } from "../../../store/authStore";
import Input from "../Input/Input";

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorMsg = useAuthStore((state) => state.loginErrors);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await loginUser({ loginEmail, loginPassword });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);
      const fieldErrors = errorHandler(error);
      applyFieldErrors<LoginErrors>(fieldErrors, setLoginError);
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleLoginFormSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        error={loginErrorMsg.email}
        label="Email"
        id="login-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        error={loginErrorMsg.password}
        label="Password"
        id="login-password"
      />
      <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
        Sign In
      </button>
    </form>
  );
}
