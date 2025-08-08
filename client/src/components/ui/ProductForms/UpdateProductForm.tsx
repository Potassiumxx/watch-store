import * as React from "react";
import useForm from "../../../hooks/useForm";
import { ProductDTO, ProductFormResponse, ProductFormStringFields, ProductStringFormValidationReturnType } from "../../../types/productType";
import { initialProductDirtyFieldState, validateProductFormStringFields, validateFileField } from "../../../utils/validateProductForm";
import ProductForm from "./ProductForm";
import useProductForm from "../../../hooks/useProductForm";
import { useUpdateProductStore } from "../../../store/productStore/useUpdateProductStore";
import { useProductStore } from "../../../store/productStore";
import { updateProduct } from "../../../services/api/productAPI";

interface UpdateProductFormProps {
  selectedProduct: ProductDTO;
  handleFormCloseFunc: () => void;
  fetchProductFunc: () => void;
}

export default function UpdateProductForm({ selectedProduct, handleFormCloseFunc, fetchProductFunc }: UpdateProductFormProps) {
  const { dirtyField, handleFieldOnChange, generalError, isValidationError, handleFormSubmit } = useForm(initialProductDirtyFieldState);
  const { handleFileUpload, validateProductFormFields, handleProductFieldOnChange } = useProductForm({
    setProductName: useUpdateProductStore.getState().setProductName,
    setProductPrice: useUpdateProductStore.getState().setProductPrice,
    setProductCategory: useUpdateProductStore.getState().setProductCategory,
    setProductDescription: useUpdateProductStore.getState().setProductDescription,
    setProductQuantity: useUpdateProductStore.getState().setProductQuantity,
    setProductFileName: useUpdateProductStore.getState().setProductFileName,
    setProductImage: useUpdateProductStore.getState().setProductImage,
  });

  const {
    productID,
    productName,
    productPrice,
    productCategory,
    productDescription,
    productQuantity,
    productImage,
    productStringErrorFields,
    productFileErrorFields,
    setProductID,
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductDescription,
    setProductQuantity,
    setProductStringFormError,
    setProductFileFormError,
    clearProductStringFormError,
    clearProductFileFormError
  } = useUpdateProductStore();

  const setProductFileName = useProductStore((state) => state.setProductFileName);
  const fileName = useProductStore((state) => state.productFileName);

  async function handleUpdateProductSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validateProductFormFields({
      stringFields: {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productQuantity
      },
      fileProperties: {
        file: productImage,
        fileName
      },
      setStringError: setProductStringFormError,
      setFileError: setProductFileFormError,
      isValidationError: isValidationError
    })) return;

    const response = await handleFormSubmit<ProductStringFormValidationReturnType, ProductFormResponse>({
      apiCall: () => updateProduct(productID, { productName, productPrice, productCategory, productDescription, productQuantity, productImage }),
      setError: setProductStringFormError
    });

    if (response) {
      handleFormCloseFunc();
      fetchProductFunc();
    };

  }

  React.useEffect(() => {
    setProductID(selectedProduct.id.toString());
    setProductName(selectedProduct.name);
    setProductPrice(selectedProduct.price.toString());
    setProductCategory(selectedProduct.category);
    setProductDescription(selectedProduct.description);
    setProductQuantity(selectedProduct.quantity.toString());

    setProductFileName(selectedProduct.imagePath);

    clearProductStringFormError();
    clearProductFileFormError();
  }, [selectedProduct])

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleFormCloseFunc();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [])


  return (
    <div className="max-h-[90vh]">
      <ProductForm
        onSubmit={handleUpdateProductSubmit}
        onChange={(e) => handleProductFieldOnChange<ProductFormStringFields>({
          event: e,
          values: {
            productName,
            productPrice,
            productCategory,
            productDescription,
            productQuantity,
          },
          dirtyField: dirtyField,
          setStringError: setProductStringFormError,
          clearStringError: clearProductStringFormError,
          handleFieldOnChange,
          validateFunction: validateProductFormStringFields
        })}
        onFileChange={(e) => handleFileUpload({
          e,
          validateFileFieldFunc: validateFileField,
          setProductFormFileErrorFunc: setProductFileFormError,
          isValidationError: isValidationError
        })}
        values={{
          productName,
          productPrice,
          productCategory,
          productDescription,
          productQuantity,
        }}
        stringFieldError={productStringErrorFields}
        fileFieldError={productFileErrorFields}
        generalError={generalError}
      />
    </div>
  )
}
