import { LoginErrors, RegisterErrors } from "../store/authStore";

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

export function validateRegisterForm(email: string, password: string, username: string): RegisterErrors {
  const errors: RegisterErrors = {};

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

  if (username.trim().length === 0) {
    errors.username = "Please enter a username";
  } else if (!/^[A-Za-z0-9_-]+$/.test(username)) {
    errors.username = "Username can only contain letters, numbers, underscores (_) or dashes (-)";
  }

  return errors;
}
