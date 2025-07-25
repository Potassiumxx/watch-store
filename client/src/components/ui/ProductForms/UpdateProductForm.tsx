import { useProductStore } from "../../../store/productStore";
import FormFieldWrapper from "../FormFieldWrapper/FormFieldWrapper";
import ProductForm from "./ProductForm";

export default function UpdateProductForm() {
  const {
    productName,
    productPrice,
    productCategory,
    productDescription,
    productQuantity,
    productImage,
    productStringErrorFields,
    productFileErrorFields,
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductDescription,
    setProductQuantity,
    setProductImage,
    setProductStringFormError,
    setProductFileFormError,
    clearProductStringFormError,
  } = useProductStore();


  async function handleUpdateProductSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("update?");
  }

  return (
    <div>
      <ProductForm
        onSubmit={handleUpdateProductSubmit}
        values={{
          productName,
          productPrice,
          productCategory,
          productDescription,
          productQuantity
        }}
        stringFieldError={productStringErrorFields}
        fileFieldError={productFileErrorFields}
      />
    </div>
  )
}
