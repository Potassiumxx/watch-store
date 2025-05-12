import { registerUser } from "../../../services/api/authAPI";
import { RegisterErrors, useAuthStore } from "../../../store/authStore";
import { applyFieldErrors, errorHandler } from "../../../utils/errorHandler";
import Input from "../Input/Input";

export function RegisterForm() {
  const registerEmail = useAuthStore((state) => state.registerEmail);
  const registerPassword = useAuthStore((state) => state.registerPassword);
  const registerUsername = useAuthStore((state) => state.registerUsername);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);
  const setRegisterUsername = useAuthStore((state) => state.setRegisterUsername);

  const setRegisterError = useAuthStore((state) => state.setRegisterError);
  const regiserErrorMsg = useAuthStore((state) => state.registerErrors);

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await registerUser({ registerEmail, registerPassword, registerUsername });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);
      const fieldErrors: Record<string, string> = errorHandler(error);
      applyFieldErrors<RegisterErrors>(fieldErrors, setRegisterError);
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleRegisterFormSubmit}>
      <Input
        type="name"
        placeholder="Username"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)}
        error={regiserErrorMsg.username}
        label="Username"
        id="register-username"
      />
      <Input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        error={regiserErrorMsg.email}
        label="Email"
        id="register-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        error={regiserErrorMsg.password}
        label="Password"
        id="register-password"
      />
      <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
