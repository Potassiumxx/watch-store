import * as React from "react";
import { getAllProducts } from "../../services/api/productAPI";
import { ProductDTO } from "../../types/productType";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = React.useState<ProductDTO[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }

    fetchProducts();
  }, [])

  return (
    <div className="text-white">
      <h1 className="text-center text-3xl font-bold mb-6">Products</h1>

      <div className="component-x-axis-padding">
        <div className="grid grid-cols-3 gap-8">
          {
            products.length > 0 ? products.map((product, index) => (
              <Link to={""}
                className={`h-[500px] flex flex-col innerDivBackgroundColour group border-[1px] border-white/[.5] rounded-md duration-200 ease-in-out transition-transform hover:-translate-y-2`}
                key={product.id}
              >
                <div className="flex flex-col gap-1 pt-4 px-4">
                  <h1 className="font-black text-3xl">{product.name}</h1>
                  <h1 className="font-semibold text-sm tracking-wide text-[#c7c7c7]">{product.category}</h1>
                </div>

                <img
                  className="min-h-[70%] object-contain w-full py-2 scale-90 group-hover:scale-105 transition-transform duration-200"
                  src={`http://localhost:5000/images/${product.imagePath}`}
                  alt={product.name}
                />

                <div className="flex justify-between align-middle items-center px-4 h-full">
                  <span className="flex gap-2 items-center">
                    <h3 className="text-[#c7c7c7] text-sm">Quantity</h3>
                    <h1 className="font-semibold text-lg">{product.quantity}</h1>
                  </span>
                  <h1 className="font-bold text-3xl">{product.price}</h1>
                </div>
              </Link>
            ))
              : <h1 className="text-white text-[32px]">No Products</h1>}
        </div>
      </div>
    </div>
  );
}
