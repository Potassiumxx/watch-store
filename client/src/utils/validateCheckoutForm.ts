import { CheckoutFormFields } from "../types/cartAndCheckoutType";
import { isEmpty } from "./helpers";

export function validateCheckoutForm({
  dropLocation,
  phoneNumber,
  cardNumber,
  expiry,
  cvv,
}: CheckoutFormFields): Partial<CheckoutFormFields> {
  const errors: Partial<CheckoutFormFields> = {};

  if (isEmpty(dropLocation)) errors.dropLocation = "Drop location cannot be empty";
  if (isEmpty(phoneNumber)) errors.phoneNumber = "Phone number cannot be empty";
  if (isEmpty(cardNumber)) errors.cardNumber = "Card number cannot be empty";
  if (isEmpty(expiry)) errors.expiry = "This field cannot be empty";
  if (isEmpty(cvv)) errors.cvv = "This field cannot be empty";

  return errors;
}
