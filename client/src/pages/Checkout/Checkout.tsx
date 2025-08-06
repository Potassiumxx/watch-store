import Button from "../../components/ui/Button/Button";
import Form from "../../components/ui/Form/Form";
import FormFieldWrapper from "../../components/ui/FormFieldWrapper/FormFieldWrapper";
import Input from "../../components/ui/Input/Input";
import { useCheckoutStore } from "../../store/checkoutStore"

export default function Checkout() {
  const { checkoutItems } = useCheckoutStore();

  const totalAmount: number = checkoutItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-4 py-8 text-white min-h-full">
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
        boxShadow: "-3px 0 12px 1px rgb(0, 0, 0, 0.8)",
      }}>
        <h1 className="text-3xl">Shipping Information</h1>
        <div className="px-0 py-10 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <FormFieldWrapper
              id="drop-location"
              label="Drop Location"
              error={""}
            >
              <Input id="drop-location" error={""} placeholder="Enter pickup location" />
            </FormFieldWrapper>
            <FormFieldWrapper
              id="phone-number"
              label="Phone Number"
              error={""}
            >
              <Input id="phone-number" error={""} type="tel" />
            </FormFieldWrapper>
            <FormFieldWrapper
              id="card-number"
              label="Card Number"
              error={""}
            >
              <Input id="card-number" error={""} placeholder="1234 1234 1234 1234" />
            </FormFieldWrapper>
            <div className="flex gap-4">
              <FormFieldWrapper
                id="expiry"
                label="Expiry"
                error={""}
              >
                <Input id="expiry" error={""} type="text" placeholder="MM/YY" maxLength={5} />
              </FormFieldWrapper>

              <FormFieldWrapper
                id="cvv"
                label="CVV"
                error={""}
              >
                <Input id="cvv" error={""} type="password" maxLength={4} placeholder="CVV/CVC" />
              </FormFieldWrapper>
            </div>

          </div>
          <Button textValue={`Pay ${totalAmount.toFixed(2)}`} className="defaultButtonStyle w-full mb-4" />
        </div>
      </div>
    </div>
  )
}
