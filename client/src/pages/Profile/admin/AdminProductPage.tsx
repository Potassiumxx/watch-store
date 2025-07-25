import * as React from "react";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { validateAddProductForm, validateFileField } from "../../../utils/validateProductForm";
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

export default function AdminProductPage() {
  const [fileName, setFileName] = React.useState<string | null>(null);

  const initialDirtyFieldState: DirtyFieldState<ProductFormFields> = {
    productName: false,
    productPrice: false,
    productCategory: false,
    productDescription: false,
    productQuantity: false,
    productImage: false,
  };

  const { isValidationError, handleFieldOnChange, dirtyField, handleFormSubmit, generalError } =
    useForm<DirtyFieldState<ProductFormFields>>(initialDirtyFieldState);

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

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setProductImage(file);
    }

    const fileError = validateFileField(file, "productImage");
    setProductFileFormError("productImage", fileError.productImage!);

    if (isValidationError<Partial<ProductFileFormValidationReturnType>>(fileError, setProductFileFormError)) return;
  }

  async function handleAddProductSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stringError = validateAddProductForm({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productQuantity,
    });

    const fileError = validateFileField(productImage, "productImage");
    setProductFileFormError("productImage", fileError.productImage!);

    if (
      isValidationError<Partial<ProductStringFormValidationReturnType>>(stringError, setProductStringFormError) ||
      isValidationError<Partial<ProductFileFormValidationReturnType>>(fileError, setProductFileFormError)
    )
      return;

    const response = await handleFormSubmit<ProductStringFormValidationReturnType, ProductFormResponse>({
      apiCall: () =>
        addProduct({ productName, productPrice, productCategory, productDescription, productQuantity, productImage }),
      setError: setProductStringFormError,
    });

    if (response) console.log("done");
  }

  function handleProductFieldOnChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = event.target;

    const productSetters: Record<keyof ProductFormStringFields, (value: string) => void> = {
      productName: setProductName,
      productPrice: setProductPrice,
      productCategory: setProductCategory,
      productDescription: setProductDescription,
      productQuantity: setProductQuantity,
    };

    handleFieldOnChange<ProductFormStringFields>({
      fieldKey: name as keyof ProductFormStringFields,
      newValue: value,
      allFormValues: {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productQuantity,
      },
      formValueSetter: (v) => productSetters[name as keyof ProductFormStringFields](v),
      validateFunction: validateAddProductForm,
      setFieldErrorFunction: setProductStringFormError,
      clearErrorsFunction: clearProductStringFormError,
      dirtyField: dirtyField,
    });
  }

  return (
    <ProfileContentContainer title="Add Product">
      <div className="innerDivBackgroundColour shadow-lg shadow-black rounded-md px-20">
        <ProductForm
          onSubmit={handleAddProductSubmit}
          onChange={(e) => handleProductFieldOnChange(e)}
          onFileChange={handleFileUpload}
          values={{ productName, productPrice, productCategory, productDescription, productQuantity }}
          fileName={fileName}
          stringFieldError={productStringErrorFields}
          fileFieldError={productFileErrorFields}
          generalError={generalError}
        />
      </div>
    </ProfileContentContainer>
  );
}
