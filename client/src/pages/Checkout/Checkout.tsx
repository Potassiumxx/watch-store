import * as React from "react";
import Button from "../../components/ui/Button/Button";
import Form from "../../components/ui/Form/Form";
import FormFieldWrapper from "../../components/ui/FormFieldWrapper/FormFieldWrapper";
import Input from "../../components/ui/Input/Input";
import { useCheckoutStore } from "../../store/checkoutStore"
import { validateCheckoutForm } from "../../utils/validateCheckoutForm";
import { CheckoutFormFields } from "../../types/cartAndCheckoutType";
import useForm from "../../hooks/useForm";

export default function Checkout() {
  const { checkoutItems,
    dropLocation,
    phoneNumber,
    cardNumber,
    cvv,
    expiry,
    checkoutFormErrorFields,
    clearCheckoutFormError,
    setCardNumber,
    setCheckoutFormError,
    setCvv,
    setDropLocation,
    setExpiry,
    setPhoneNumber } = useCheckoutStore();

  const formValueSetterMap: Record<keyof CheckoutFormFields, (val: string) => void> = {
    dropLocation: setDropLocation,
    phoneNumber: setPhoneNumber,
    cardNumber: (val) => setCardNumber(formatCardNumber(val)),
    expiry: setExpiry,
    cvv: setCvv,
  };

  const initialDirtyFieldState = {
    dropLocation: false,
    phoneNumber: false,
    cardNumber: false,
    cvv: false,
    expiry: false,
  }

  const { dirtyField, handleFieldOnChange, isValidationError } = useForm(initialDirtyFieldState);

  const totalAmount: number = checkoutItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  function formatCardNumber(value: string) {
    return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  }

  async function handleCheckoutFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateCheckoutForm({
      dropLocation,
      cardNumber,
      phoneNumber,
      cvv,
      expiry
    })

    if (isValidationError(validationError, setCheckoutFormError)) return;
    clearCheckoutFormError();
  }

  function handleCheckoutFieldOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    const key = name as keyof CheckoutFormFields;
    const formValueSetter = formValueSetterMap[key]
    if (!formValueSetter) return;

    handleFieldOnChange<CheckoutFormFields>({
      fieldKey: key,
      newValue: value,
      allFormValues: {
        dropLocation,
        phoneNumber,
        cardNumber,
        expiry,
        cvv
      },
      formValueSetter,
      validateFunction: validateCheckoutForm,
      setFieldErrorFunction: setCheckoutFormError,
      clearErrorsFunction: clearCheckoutFormError,
      dirtyField,
    });
  };

  React.useEffect(() => {
    clearCheckoutFormError();
  }, [])

  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-4 py-8 text-white min-h-full">
      <div className="component-x-axis-padding">
        <h1 className="text-3xl">{checkoutItems.length > 1 ? "Your Items" : "Your Item"}</h1>
        <div className="flex flex-col gap-10">
          {
            checkoutItems.length === 0 ? (
              <div>No items to checkout</div>
            ) : (
              <div className="pt-10 max-h-[500px] overflow-y-auto"> {
                checkoutItems.map((item) => {
                  return (
                    <div className="pt-2" key={item.id}>
                      <div className="flex">
                        <img
                          src={`http://localhost:5000/images/${item.imagePath}`}
                          className="w-40 h-[120px] object-contain"
                        />
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col">
                            <span className="font-semibold max-w-[200px] whitespace-nowrap overflow-x-auto">{item.name}</span>
                            <span className="text-[14px] text-gray-400">Quantity: <span className="text-white font-semibold">{item.quantity}</span></span>
                          </div>
                          <div className="flex flex-col items-end pr-2 max-w-[100px]">
                            <span className="max-w-full whitespace-nowrap overflow-x-auto">{item.price * item.quantity}</span>
                            {item.quantity > 1 && <span className="text-[14px] text-gray-400 max-w-full whitespace-nowrap overflow-x-auto">{item.price} each</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                  )
                })}
              </div>
            )
          }
          <div className="flex justify-between">
            <span className="text-white text-2xl">Total</span>
            <div className="max-w-[200px] overflow-style font-semibold text-2xl">{totalAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className="component-x-axis-padding rounded-sm h-[550px]" style={{
        boxShadow: "-3px 0 12px 4px rgb(0, 0, 0, 0.9)",
      }}>
        <h1 className="text-3xl">Shipping Information</h1>
        <div className="px-0 py-10 flex flex-col justify-between h-full">
          <Form className="flex flex-col p-0 justify-between h-full" handleFormSubmit={handleCheckoutFormSubmit}>
            <div className="flex flex-col gap-4">
              <FormFieldWrapper
                id="drop-location"
                label="Drop Location"
                error={checkoutFormErrorFields.dropLocation}
                labelClassName="flex w-full whitespace-nowrap"
              >
                <Input
                  id="drop-location"
                  name="dropLocation"
                  error={checkoutFormErrorFields.dropLocation}
                  placeholder="Enter pickup location. Be as precise as possible"
                  onChange={handleCheckoutFieldOnChange}
                />
              </FormFieldWrapper>
              <FormFieldWrapper
                id="phone-number"
                label="Phone Number"
                error={checkoutFormErrorFields.phoneNumber}
                labelClassName="flex w-full whitespace-nowrap"
              >
                <Input
                  id="phone-number"
                  name="phoneNumber"
                  error={checkoutFormErrorFields.phoneNumber}
                  type="tel"
                  onChange={handleCheckoutFieldOnChange}
                />
              </FormFieldWrapper>
              <FormFieldWrapper
                id="card-number"
                label="Card Number"
                error={checkoutFormErrorFields.cardNumber}
                labelClassName="flex w-full whitespace-nowrap"
              >
                <Input
                  id="card-number"
                  name="cardNumber"
                  error={checkoutFormErrorFields.cardNumber}
                  placeholder="1234 1234 1234 1234"
                  inputMode="numeric"
                  pattern="\d"
                  maxLength={19}  // 16 digits + 3 spaces
                  onChange={handleCheckoutFieldOnChange}
                  value={cardNumber}
                />
              </FormFieldWrapper>
              <div className="flex gap-4">
                <FormFieldWrapper
                  id="expiry"
                  label="Expiry"
                  error={checkoutFormErrorFields.expiry}
                  labelClassName="flex w-full whitespace-nowrap"
                >
                  <Input
                    id="expiry"
                    name="expiry"
                    error={checkoutFormErrorFields.expiry}
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={handleCheckoutFieldOnChange}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  id="cvv"
                  label="CVV"
                  error={checkoutFormErrorFields.cvv}
                  labelClassName="flex w-full whitespace-nowrap"
                >
                  <Input
                    id="cvv"
                    name="cvv"
                    error={checkoutFormErrorFields.cvv}
                    type="tel"
                    inputMode="numeric"
                    pattern="/d{3,4}"
                    maxLength={4}
                    placeholder="CVV/CVC"
                    onChange={handleCheckoutFieldOnChange}
                  />
                </FormFieldWrapper>
              </div>
            </div>

            <Button textValue={`Pay ${totalAmount.toFixed(2)}`} className="defaultButtonStyle w-full mb-4" />
          </Form>
        </div>
      </div>
    </div>
  )
}
