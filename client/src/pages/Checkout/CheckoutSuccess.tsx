import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUIStore } from "../../store/uiStore";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  const { showSuccessfulCheckoutPage, setShowSuccessfulCheckoutPage } = useUIStore()

  React.useEffect(() => {
    if (!showSuccessfulCheckoutPage) navigate("/", { replace: true });
    setShowSuccessfulCheckoutPage(false);
  }, [])

  return (
    <div className="h-dvh">
      <h1 className="text-white text-4xl text-center mt-[10rem] mb-20">Checkout successful!</h1>
      <h3 className="text-white text-2xl text-center mb-20">Your product should be with you soon.</h3>
      <div className="w-full text-center">
        <Link to={"/profile"} className="text-white text-2xl underline underline-offset-8">View your order</Link>
      </div>
    </div>
  )
}
