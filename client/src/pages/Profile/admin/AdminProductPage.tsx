import * as React from "react";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { initialProductDirtyFieldState, validateProductFormStringFields, validateFileField } from "../../../utils/validateProductForm";
import { useProductStore } from "../../../store/productStore";
import useForm from "../../../hooks/useForm";
import { DirtyFieldState } from "../../../types/form";
import {
  ProductFileFormValidationReturnType,
  ProductFormFields,
  ProductFormResponse,
  ProductFormStringFields,
  ProductStringFormValidationReturnType,
} from "../../../types/productType";
import { addProduct } from "../../../services/api/productAPI";
import ProductForm from "../../../components/ui/ProductForms/ProductForm";
import useProductForm from "../../../hooks/useProductForm";
import { useAddProductStore } from "../../../store/productStore/useAddProductStore";

export default function AdminProductPage() {
  const { isValidationError, handleFieldOnChange, dirtyField, handleFormSubmit, generalError } =
    useForm<DirtyFieldState<ProductFormFields>>(initialProductDirtyFieldState);
  const { handleFileUpload, validateProductFormFields, handleProductFieldOnChange } = useProductForm({
    setProductName: useAddProductStore.getState().setProductName,
    setProductPrice: useAddProductStore.getState().setProductPrice,
    setProductCategory: useAddProductStore.getState().setProductCategory,
    setProductDescription: useAddProductStore.getState().setProductDescription,
    setProductQuantity: useAddProductStore.getState().setProductQuantity,
    setProductFileName: useAddProductStore.getState().setProductFileName,
    setProductImage: useAddProductStore.getState().setProductImage,
  });

  const {
    productName,
    productPrice,
    productCategory,
    productDescription,
    productQuantity,
    productImage,
    productStringErrorFields,
    productFileErrorFields,
    setProductStringFormError,
    setProductFileFormError,
    clearProductStringFormError,
    clearProductFileFormError
  } = useAddProductStore();

  async function handleAddProductSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validateProductFormFields({
      stringFields: {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productQuantity
      },
      fileField: productImage,
      setStringError: setProductStringFormError,
      setFileError: setProductFileFormError,
      isValidationError: isValidationError
    })) return;

    const response = await handleFormSubmit<ProductStringFormValidationReturnType, ProductFormResponse>({
      apiCall: () =>
        addProduct({ productName, productPrice, productCategory, productDescription, productQuantity, productImage }),
      setError: setProductStringFormError,
    });

    if (response) console.log("done");
  }

  React.useEffect(() => {
    clearProductStringFormError();
    clearProductFileFormError();
  }, [])

  return (
    <ProfileContentContainer title="Add Product">
      <div className="innerDivBackgroundColour shadow-lg shadow-black rounded-md px-20">
        <ProductForm
          onSubmit={handleAddProductSubmit}
          onChange={(e) => handleProductFieldOnChange<ProductFormStringFields>({
            event: e,
            values: {
              productName,
              productPrice,
              productCategory,
              productDescription,
              productQuantity
            },
            dirtyField: dirtyField,
            setStringError: setProductStringFormError,
            clearStringError: clearProductStringFormError,
            handleFieldOnChange: handleFieldOnChange,
            validateFunction: validateProductFormStringFields
          })}
          onFileChange={(e) => handleFileUpload({
            e,
            validateFileFieldFunc: validateFileField,
            setProductFormFileErrorFunc: setProductFileFormError,
            isValidationError: isValidationError
          })}
          values={{ productName, productPrice, productCategory, productDescription, productQuantity }}
          stringFieldError={productStringErrorFields}
          fileFieldError={productFileErrorFields}
          generalError={generalError}
        />
      </div>
    </ProfileContentContainer>
  );
}
