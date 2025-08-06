import Button from "../../components/ui/Button/Button";
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
              <div className="pt-10 max-h-[300px] overflow-y-auto"> {
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
          <div className="max-w-full whitespace-nowrap overflow-x-auto">
            <span className="text-white text-2xl">Total: {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="component-x-axis-padding rounded-sm" style={{
        boxShadow: "-3px 0 12px 1px rgb(0, 0, 0, 0.8)",
      }}>
        <h1 className="text-3xl">Shipping Information</h1>
      </div>
    </div>
  )
}
