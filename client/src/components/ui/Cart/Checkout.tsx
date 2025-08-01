import * as React from "react";
import { useUIStore } from "../../../store/uiStore"

export default function Checkout() {
  const setShowCart = useUIStore((state) => state.setShowCart);

  React.useEffect(() => {
    setShowCart(false);
  }, [])

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Thank you for buying</h1>
    </div>
  )
}
