import * as React from "react";
import { getAllProducts } from "../../services/api/productAPI";
import { ProductDTO } from "../../types/productType";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { useUserStore } from "../../store/userStore";
import { ROLES } from "../../utils/constants";

export default function Products() {
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const role = useUserStore((state) => state.role);

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
                className={`h-[500px] flex flex-col innerDivBackgroundColour group border-[1px] border-white/[.5] rounded-md hover:border-white`}
                key={product.id}
              >
                <div className="flex justify-between pt-4 px-4 items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-black text-3xl">{product.name}</h1>
                    <h1 className="font-semibold text-sm tracking-wide text-[#c7c7c7]">{product.category}</h1>
                  </div>
                  {role === ROLES.ADMIN &&
                    <div className="flex gap-5">
                      <Button textValue="Edit" className="defaultButtonStyle h-[35px] w-[60px] items-center" />
                      <Button textValue="Delete" className="defaultButtonStyle h-[35px] w-[70px] items-center bg-red-600 hover:bg-red-800 hover:text-white" />
                    </div>
                  }
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
