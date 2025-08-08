import * as React from "react";
import { deleteProduct, getAllProducts } from "../../services/api/productAPI";
import { ProductDTO } from "../../types/productType";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { useUserStore } from "../../store/userStore";
import { ROLES } from "../../utils/constants";
import UpdateProductForm from "../../components/ui/ProductForms/UpdateProductForm";
import { IoCloseOutline } from "react-icons/io5";
import { useProductStore } from "../../store/productStore";
import ConfirmModal from "../../components/ui/ConfirmModal/ConfirmModal";
import { fetchErrorCatcher } from "../../utils/helpers";
import FetchStatusDisplay from "../../components/ui/FetchStatusDisplay/FetchStatusDisplay";
import { useNavbarStore } from "../../store/navbarStore";
import getLevenshteinDistance from "../../utils/algorithm";

export default function Products() {
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const [showUpdateForm, setShowUpdateForm] = React.useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setIsError] = React.useState<string | null>(null);
  const [productToDelete, setProductToDelete] = React.useState({
    id: 0,
    name: ""
  });

  const [selectedProduct, setSelectedProduct] = React.useState<ProductDTO>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    quantity: 0,
    imagePath: "null"
  });

  const role = useUserStore((state) => state.role);

  const setProductFileName = useProductStore((state) => state.setProductFileName);

  const searchedValue = useNavbarStore((state) => state.searchedValue);

  function handleFormClose() {
    setShowUpdateForm(false);

    // Reset the file name on close so that it does not get carried to the add product page.
    // Add product page sould initially be empty. More information about this will be provided in the future.
    setProductFileName("");
  }

  function getFilteredProducts(searchedString: string) {
    if (!searchedString.trim()) return products;

    const threshold = 4;

    //const filteredProducts = products.filter((product) => {
    //return product.name.toLowerCase().includes(searchedString.toLowerCase());
    //})

    const scored = products.map((product) => {
      const score = getLevenshteinDistance(
        searchedString.toLowerCase(), product.name.toLowerCase()
      );
      return { ...product, score };
    }).filter((product) => product.score <= threshold)
      .sort((a, b) => a.score - b.score);

    return scored;
  }

  async function fetchProducts() {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      fetchErrorCatcher(error, setIsError);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleProductDelete(productID: number) {
    try {
      const response = await deleteProduct(productID);
      fetchProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, [])

  if (products.length === 0 || getFilteredProducts(searchedValue).length === 0) return (
    <div className="w-full text-center mt-20">
      <h1 className="text-white text-4xl font-semibold">No products found</h1>
    </div>
  )

  return (
    <FetchStatusDisplay isLoading={isLoading} error={error} isEmpty={!products} emptyMessage="No products available">
      <div className="text-white">
        <h1 className="text-center text-3xl font-bold mb-6">Products</h1>

        <div className="component-x-axis-padding grid grid-cols-3 gap-8 pb-10">
          {
            getFilteredProducts(searchedValue).map((product) => (
              <div
                className="flex flex-col gap"
                key={product.id}
              >
                {role === ROLES.ADMIN &&
                  <div className="flex gap-5 justify-end">
                    <div className="after:block after:bg-white after:w-[1px] after:h-2 after:items-center after:mx-auto hover:after:w-[3px]">
                      <Button textValue="Edit"
                        className="defaultButtonStyle h-[35px] w-[60px] items-center"
                        onClick={() => {
                          setShowUpdateForm(true);
                          setSelectedProduct(product);
                        }} />
                    </div>
                    <div className="after:flex after:bg-white after:w-[1px] after:h-2 after:justify-center after:items-center after:mx-auto hover:after:w-[3px]">
                      <Button textValue="Delete"
                        className="defaultButtonStyle h-[35px] w-[70px] items-center bg-red-600 hover:bg-red-800 hover:text-white"
                        onClick={() => {
                          setShowConfirmModal(true);
                          setProductToDelete({ id: product.id, name: product.name });
                        }}
                      />
                    </div>
                  </div>
                }
                <Link to={`/product/${product.id}`}>
                  <div
                    className={`h-[500px] flex flex-col innerDivBackgroundColour group border-[1px] border-white/[.5] rounded-md hover:border-white`}>
                    <div className="flex justify-between pt-4 px-4 items-center">
                      <div className="flex flex-col gap-1">
                        <h1 className="font-black text-3xl whitespace-nowrap overflow-x-auto max-w-[200px]">{product.name}</h1>
                        <h1 className="font-semibold text-sm tracking-wide text-[#c7c7c7]">{product.category}</h1>
                      </div>
                    </div>
                    <img
                      className="h-[370px] object-contain w-full py-2 scale-90 group-hover:scale-105 transition-transform duration-200"
                      src={`http://localhost:5000/images/${product.imagePath}`}
                      alt={product.name}
                    />

                    <div className="flex justify-between align-middle items-center px-4">
                      <span className="flex gap-2 items-center">
                        <h3 className="text-[#c7c7c7] text-sm">Quantity</h3>
                        <h1 className="font-semibold text-lg max-w-[50px] overflow-x-auto">{product.quantity}</h1>
                      </span>
                      <h1 className="font-bold text-3xl max-w-[90px] overflow-x-auto whitespace-nowrap">{product.price}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        {
          showUpdateForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center outerDivBackgroundColour">
              <div className="relative innerDivBackgroundColour rounded-md shadow-lg shadow-gray-800">
                <div className="flex py-4 px-6 items-center border-b-[1px] border-white">
                  <h2 className="w-full text-white justify-self-center text-3xl font-semibold text-center">Update Product</h2>
                  <button className="absolute right-6 text-red-600 z-50 hover:text-red-400 duration-200"
                    onClick={handleFormClose}>{<IoCloseOutline
                      size={45} />}</button>
                </div>
                <UpdateProductForm
                  selectedProduct={selectedProduct}
                  handleFormCloseFunc={handleFormClose}
                  fetchProductFunc={fetchProducts}
                />
              </div>
            </div>
          )
        }

        {
          showConfirmModal && (
            <ConfirmModal
              isOpen={true}
              message={`Are you sure you want to delete "${productToDelete.name}"?`}
              onConfirm={() => {
                handleProductDelete(productToDelete.id);
                setShowConfirmModal(false);
              }}
              onCancel={() => {
                setShowConfirmModal(false);
                setProductToDelete({ id: 0, name: "" });
              }}
            />
          )
        }
      </div>
    </FetchStatusDisplay >
  );
}
