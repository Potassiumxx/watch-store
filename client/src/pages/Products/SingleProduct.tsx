import * as React from "react";
import { useParams } from "react-router-dom";
import { ProductDTO } from "../../types/productType";
import { getProductByID } from "../../services/api/productAPI";
import { fetchErrorCatcher } from "../../utils/helpers";
import FetchStatusDisplay from "../../components/ui/FetchStatusDisplay/FetchStatusDisplay";
import Button from "../../components/ui/Button/Button";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";

export default function SingleProductPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductDTO | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);
  const setShowUserMenu = useUIStore((state) => state.setShowUserMenu);

  async function fetchProduct() {
    try {
      const data = await getProductByID(Number(id));
      setProduct(data);
    } catch (error) {
      fetchErrorCatcher(error, setError);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <FetchStatusDisplay isLoading={isLoading} isEmpty={!product} error={error} emptyMessage="Could not fetch product.">
      {product &&
        <div className="grid grid-cols-2 gap-8 text-white">
          <img
            src={`http://localhost:5000/images/${product.imagePath}`}
            alt={product.name}
            className="w-[600px] rounded-lg shadow-lg"
          />
          <div className="flex flex-col px-2 py-4 gap-8 pl-8 max-w-[500px]">
            <div>
              <h1 className="text-5xl font-semibold mb-4 w-full overflow-style">{product.name}</h1>
              <p className="text-2xl text-gray-300 mb-2 max-w-full overflow-style">{product.category}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex justify-between text-gray-300 items-center uppercase">
                <h4>Price</h4>
                <h4>Quantity</h4>
              </span>
              <span className="flex justify-between items-center">
                <p className="text-4xl font-semibold max-w-[130px] overflow-style">{product.price}</p>
                <span className="text-3xl font-semibold text-left max-w-[80px] overflow-style">{product.quantity}</span>
              </span>
            </div>
            <span className="flex flex-col gap-4 border-b-2">
              <h4 className="uppercase text-gray-300">Description</h4>
              <p className="text-base mb-4 max-h-[250px] max-w-full overflow-style">{product.description}</p>
            </span>
            {
              product.quantity > 0 ?
                <Button
                  textValue="Add to cart"
                  className="defaultButtonStyle w-full bg-orange-700 hover:bg-orange-600 hover:text-white"
                  onClick={() => {
                    if (!isUserSignedIn) return setShowUserMenu(true);
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      availableStock: product.quantity,
                      quantity: 1,
                      category: product.category,
                      imagePath: product.imagePath,
                    })
                  }}
                /> : <div className="text-3xl font-semibold text-center">Out of stock</div>
            }
          </div>
        </div>
      }
    </FetchStatusDisplay>
  );
}

