import { LoginFields, RegisterField } from "../types/form";

export function validateLoginForm({ email, password }: LoginFields): Partial<LoginFields> {
  const errors: Partial<LoginFields> = {};

  if (email?.trim().length === 0) {
    errors.email = "Please enter an Email";
  } else if (email !== undefined && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Invalid Email pattern.";
  }

  if (password?.trim().length === 0) {
    errors.password = "Please enter a password";
  }

  return errors;
}

export function validateRegisterForm(email: string, password: string, username: string): RegisterField {
  const errors: RegisterField = {};

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
