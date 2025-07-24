import * as React from "react";
import { getAllProducts } from "../../services/api/productAPI";
import { ProductDTO } from "../../types/productType";

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

      <div className="innerDivBackgroundColour py-8 mx-8 px-4">
        <div className="flex gap-x-6">
          {
            products.length > 0 ? products.map((product, index) => (
              <div
                className={`w-[300px] h-[400px] flex flex-col px-4 border-l border-gray-600 ${index === 0 ? 'border-l-0' : ''}`}
                key={product.id}
              >
                <div className="flex flex-col gap-1 pt-4">
                  <h1 className="font-black text-[22px]">{product.name}</h1>
                  <h1 className="font-semibold text-sm tracking-wide text-[#c7c7c7]">{product.category}</h1>
                </div>

                <img
                  className="my-4 h-[160px] object-cover rounded-md"
                  src="./src/assets/images/pexels-pixabay-277319.jpg"
                  alt={product.name}
                />

                <div className="flex justify-between items-center mt-auto">
                  <span className="flex gap-2 items-center">
                    <h3 className="text-[#c7c7c7] text-sm">Quantity</h3>
                    <h1 className="font-semibold text-lg">{product.quantity}</h1>
                  </span>
                  <h1 className="font-bold text-2xl">{product.price}€</h1>
                </div>
              </div>
            ))
              : <h1 className="text-white text-[32px]">No Products</h1>}
        </div>
      </div>
    </div>
  );
}
