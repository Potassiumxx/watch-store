import { LoginErrors } from "../store/authStore";

export function validateLoginForm(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (email.trim().length === 0) {
    errors.email = "Please enter an Email";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Invalid Email pattern.";
  }

  if (password.trim().length === 0) {
    errors.password = "Please enter a password";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[a-zA-Z]/.test(password)) {
    errors.password = "Password must contain at least one letter";
  }

  return errors;
}
