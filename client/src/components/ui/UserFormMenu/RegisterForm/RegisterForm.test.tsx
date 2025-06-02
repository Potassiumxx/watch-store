import RegisterForm from "./RegisterForm";
import { cleanup, render, screen } from "@testing-library/react";
import * as validationModule from "../../../../utils/validateForm";
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

  it("renders email, password, username and submit button", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("calls validation function on submit", async () => {
    render(<RegisterForm />);
    const validateLoginFormMock = vi.spyOn(validationModule, "validateRegisterForm");
    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    const user = userEvent.setup();

    await user.click(submitBtn);
    expect(validateLoginFormMock).toHaveBeenCalled();
  });
});
