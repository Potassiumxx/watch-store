import { LoginFields, ProductFormFields, RegisterFields } from "../types/form";

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
    errors.username = "Invalid character for username";
  }

  return errors;
}

export function validateAddProductForm({
  productName,
  productPrice,
  productCategory,
  productDescription,
  productImage,
}: ProductFormFields): Partial<ProductFormFields> {
  const errors: Partial<ProductFormFields> = {};

  if (isEmpty(productName)) errors.productName = "This field cannot be empty";
  if (isEmpty(productPrice)) errors.productPrice = "This field cannot be empty";
  if (isEmpty(productCategory)) errors.productCategory = "This field cannot be empty";
  if (isEmpty(productDescription)) errors.productDescription = "This field cannot be empty";
  if (isEmpty(productImage)) errors.productImage = "Product image must be uploaded";

  return errors;
}
