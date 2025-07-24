import * as React from "react";
import { getAllProducts } from "../../services/api/productAPI";

export default function Products() {

  React.useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className={`text-white`}>
      <h1 className="text-center">Products</h1>
      <div className="innerDivBackgroundColour py-8">
        <div className="w-[400px] rounded-md h-[400px] flex flex-col border-2 border-white px-4">
          <div className="flex flex-col gap pt-4">
            <h1 className="font-black text-[28px]">Rolex</h1>
            <h1 className="font-semibold text-[15px] tracking-wide text-[#c7c7c7]">Digital Watch</h1>
          </div>
          <img className="" src="./src/assets/images/pexels-pixabay-277319.jpg" />
          <div className="flex justify-between mx-0 align-middle items-center h-full">
            <span className="flex gap-2 items-center">
              <h3 className="text-[#c7c7c7]">Quantity</h3>
              <h1 className="font-semibold text-[20px]">10</h1>
            </span>
            <h1 className="font-[900] text-[28px]">$100</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
