import * as React from "react";
import { useParams } from "react-router-dom";
import { ProductDTO } from "../../types/productType";
import { getProductByID } from "../../services/api/productAPI";

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState<ProductDTO | null>(null);

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductByID(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-2">{product.category}</p>
      <p className="text-base mb-2">{product.description}</p>
      <p className="text-2xl font-semibold mb-4">${product.price}</p>
      <img src={`http://localhost:5000/images/${product.imagePath}`} alt={product.name} className="w-[300px] rounded" />
    </div>
  );
}

