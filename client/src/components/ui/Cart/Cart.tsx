import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";
import Button from "../Button/Button";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import { MdDeleteOutline } from "react-icons/md";
import * as React from "react";
import { useCheckoutStore } from "../../../store/checkoutStore";

export function Cart() {
  const [closeSidePanel, setCloseSidePanel] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  const { setCheckoutItems } = useCheckoutStore();

  function handleCheckout() {
    setCheckoutItems(cartItems);
    navigate("/checkout");
    setCloseSidePanel(true);
  }

  return (
    <>
      <SidePanelContainer
        panelTitle={`${cartItems.length > 1 ? "Items" : "Item"} - ${cartItems.length}`}
        className="w-[520px] flex flex-col"
        closeSidePanel={closeSidePanel}
      >
        {cartItems.length === 0 ? (
          <div className="m-auto h-full flex flex-col justify-center items-center gap-[30px]">
            <h1 className="text-[25px] font-bold tracking-widest">YOUR CART IS EMPTY</h1>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              {
                cartItems.map((item) => {
                  return (
                    <div className="flex px-4 py-2 border-b border-white/[.5]" key={item.id}>
                      <img
                        src={`http://localhost:5000/images/${item.imagePath}`}
                        className="w-40 h-[120px] object-contain"
                      />
                      <div className="grid grid-cols-[2fr_1fr] w-full gap-2">
                        <div className="flex flex-col h-full justify-between w-[250px] overflow-style">
                          <h1 className="text-white font-semibold text-2xl max-w-[250px] overflow-style">{item.name}</h1>
                          <span className="text-gray-400 text-sm">{item.category}</span>
                          <div className="flex gap-2 items-end overflow-style">
                            <span className="text-2xl font-semibold">{item.price * item.quantity}</span>
                            <span className="text-sm text-gray-400">{item.price} per unit</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex justify-end">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 text-2xl">
                              <MdDeleteOutline />
                            </button>
                          </div>
                          <div className="flex items-center h-full">
                            <div className="border border-white/[.2] w-full flex justify-between h-[50%] items-center">
                              <button
                                onClick={() => {
                                  if (item.quantity < item.availableStock) {
                                    updateQuantity(item.id, item.quantity + 1);
                                  }
                                }}
                                className="border-r border-white/[.2] w-8 hover:bg-white hover:text-black font-bold text-2xl duration-200 h-full">+</button>
                              <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                className="w-[40px] text-center bg-transparent outline-none focus:outline-[1px] focus:outline-white"
                                onChange={(e) => {
                                  const quantityValue = parseInt(e.target.value);
                                  if (!isNaN(quantityValue) && quantityValue > 0 && quantityValue <= item.availableStock) {
                                    updateQuantity(item.id, parseInt(e.target.value))
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateQuantity(item.id, item.quantity - 1);
                                  }
                                }}
                                className="border-l border-white/[.2] w-8 hover:bg-white hover:text-black font-bold text-2xl duration-200 h-full">-</button>
                            </div>
                          </div>
                          <span className="text-white font-bold text-[14px] mx-auto">Available: {item.availableStock - item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="p-4 border-t border-white/[.5] bg-black h-[120px]">
              <Button
                textValue="Checkout"
                className="defaultButtonStyle bg-orange-600 text-white font-semibold w-full left-0 hover:bg-orange-500"
                onClick={handleCheckout}
              />
            </div>
          </div>
        )}
      </SidePanelContainer>
    </>
  )
}
