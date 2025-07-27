import { useCartStore } from "../../../store/cartStore";
import SidePanelContainer from "../SidePanel/SidePanelContainer";

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  return (
    <>
      <SidePanelContainer panelTitle={`${cartItems.length > 1 ? "Items" : "Item"} - ${cartItems.length}`}>
        {cartItems.length === 0 ? (
          <div className="m-auto h-full flex flex-col justify-center items-center gap-[30px]">
            <h1 className="text-[25px] font-bold tracking-widest">YOUR CART IS EMPTY</h1>
          </div>
        ) : (
          <div className="text-white p-4 flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={`http://localhost:5000/images/${item.imagePath}`} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>${item.price} x {item.quantity}</p>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 mt-1"
                  />
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">Remove</button>
              </div>
            ))}
          </div>
        )}
      </SidePanelContainer>
    </>
  )
}
