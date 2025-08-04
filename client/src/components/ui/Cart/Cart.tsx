import { useCartStore } from "../../../store/cartStore";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import { MdDeleteOutline } from "react-icons/md";

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  return (
    <>
      <SidePanelContainer panelTitle={`${cartItems.length > 1 ? "Items" : "Item"} - ${cartItems.length}`} className="w-[520px]">
        {cartItems.length === 0 ? (
          <div className="m-auto h-full flex flex-col justify-center items-center gap-[30px]">
            <h1 className="text-[25px] font-bold tracking-widest">YOUR CART IS EMPTY</h1>
          </div>
        ) : (
          cartItems.map((item) => {
            return (
              <div className="flex px-4 py-2 border-b border-white/[.5]">
                <img
                  src={`http://localhost:5000/images/${item.imagePath}`}
                  className="w-40 h-[120px] object-contain"
                />
                <div className="grid grid-cols-[2fr_1fr] w-full gap-2">
                  <div className="flex flex-col h-full justify-between w-[250px] overflow-scroll">
                    <h1 className="text-white font-semibold text-2xl max-w-[250px] overflow-scroll">{item.name}</h1>
                    <span className="text-gray-400 text-sm">{item.category}</span>
                    <div className="flex gap-2 items-end">
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
                        <button className="border-r border-white/[.2] w-8 hover:bg-white hover:text-black font-bold text-2xl duration-200 h-full">+</button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          className="w-[40px] text-center bg-transparent outline-none focus:outline-[1px] focus:outline-white"
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        />
                        <button className="border-l border-white/[.2] w-8 hover:bg-white hover:text-black font-bold text-2xl duration-200 h-full">-</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </SidePanelContainer>
    </>
  )
}
