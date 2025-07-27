import * as React from "react";
import { useParams } from "react-router-dom";
import { ProductDTO } from "../../types/productType";
import { getProductByID } from "../../services/api/productAPI";
import { fetchErrorCatcher } from "../../utils/helpers";
import Loader from "../../components/ui/Loader/Loader";
import FetchStatusDisplay from "../../components/ui/FetchStatusDisplay/FetchStatusDisplay";

export default function SingleProductPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductDTO | null>(null);

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
        <div className="p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-2">{product.category}</p>
          <p className="text-base mb-2">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <img src={`http://localhost:5000/images/${product.imagePath}`} alt={product.name} className="w-[300px] rounded" />
        </div>
      }
    </FetchStatusDisplay>
  );
}

