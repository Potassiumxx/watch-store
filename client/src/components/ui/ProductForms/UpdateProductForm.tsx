import * as React from "react";
import useForm from "../../../hooks/useForm";
import { useProductStore } from "../../../store/productStore";
import { ProductDTO, ProductFormFields, ProductFormFileField, ProductFormStringFields } from "../../../types/productType";
import { initialProductDirtyFieldState, validateProductFormStringFields, validateFileField } from "../../../utils/validateProductForm";
import FormFieldWrapper from "../FormFieldWrapper/FormFieldWrapper";
import ProductForm from "./ProductForm";
import useProductForm from "../../../hooks/useProductForm";

interface UpdateProductFormProps {
  //productStringFields: ProductFormStringFields;
  //productFileField: ProductFormFileField;
  selectedProduct: ProductDTO;
}

export default function UpdateProductForm({ selectedProduct }: UpdateProductFormProps) {
  const { dirtyField, handleFieldOnChange, generalError, isValidationError } = useForm(initialProductDirtyFieldState);
  const { handleFileUpload, validateProductFormFields } = useProductForm();

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
    clearProductFileFormError
  } = useProductStore();


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
      fileField: productImage,
      setStringError: setProductStringFormError,
      setFileError: setProductFileFormError,
      isValidationError: isValidationError
    })) return;

    console.log(selectedProduct);
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
      validateFunction: validateProductFormStringFields,
      setFieldErrorFunction: setProductStringFormError,
      clearErrorsFunction: clearProductStringFormError,
      dirtyField: dirtyField,
    });
  }

  React.useEffect(() => {
    setProductName(selectedProduct.name);
    setProductPrice(selectedProduct.price.toString());
    setProductCategory(selectedProduct.category);
    setProductDescription(selectedProduct.description);
    setProductQuantity(selectedProduct.quantity.toString());
    setProductImage(selectedProduct.imagePath);   // Use image name as a placeholder to validate for now instead of actual image

    clearProductStringFormError();
    clearProductFileFormError();
  }, [selectedProduct])


  return (
    <div>
      <ProductForm
        onSubmit={handleUpdateProductSubmit}
        onChange={(e) => handleProductFieldOnChange(e)}
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
