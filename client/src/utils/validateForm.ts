import { LoginFields, RegisterFields } from "../types/form";

function isEmpty(value?: string): boolean {
  return !value?.trim();
}

function isEmailInvalid(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailPattern.test(email);
}

function isPasswordInvalid(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter";
  return null;
}

export function validateLoginForm({ email, password }: LoginFields): Partial<LoginFields> {
  const errors: Partial<LoginFields> = {};

  if (isEmpty(email)) {
    errors.email = "Please enter an Email";
  } else if (email && isEmailInvalid(email)) {
    errors.email = "Invalid Email pattern.";
  }

  if (isEmpty(password)) {
    errors.password = "Please enter a password";
  }

  return errors;
}

export function validateRegisterForm({ email, password, username }: RegisterFields): Partial<RegisterFields> {
  const errors: Partial<RegisterFields> = {};

  if (isEmpty(email)) {
    errors.email = "Please enter an Email";
  } else if (email && isEmailInvalid(email)) {
    errors.email = "Invalid Email pattern.";
  }

  if (isEmpty(password)) {
    errors.password = "Please enter a password";
  } else {
    const passwordError = isPasswordInvalid(password!);
    if (passwordError) errors.password = passwordError;
  }

  if (isEmpty(username)) {
    errors.username = "Please enter a username";
  } else if (username && !/^[A-Za-z0-9_-]+$/.test(username)) {
    errors.username = "Username can only contain letters, numbers, underscores (_) or dashes (-)";
  }

  return errors;
}
