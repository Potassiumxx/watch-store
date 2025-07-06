import LoginForm from "./LoginForm";
import { cleanup, render, screen } from "@testing-library/react";
import * as validationModule from "../../../../utils/validateAuthForm";
import userEvent from "@testing-library/user-event";

describe("Login Form component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    cleanup();
    vi.resetModules();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email, password and submit button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("calls validation function on submit", async () => {
    render(<LoginForm />);
    const validateLoginFormMock = vi.spyOn(validationModule, "validateLoginForm");
    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    const user = userEvent.setup();

    await user.click(submitBtn);
    expect(validateLoginFormMock).toHaveBeenCalled();
  });
});
