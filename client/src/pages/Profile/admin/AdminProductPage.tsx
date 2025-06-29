import * as React from "react";
import Button from "../../../components/ui/Button/Button";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { validateAddProductForm } from "../../../utils/validateForm";
import { useProductStore } from "../../../store/productStore";
import useForm from "../../../hooks/useForm";
import { DirtyFieldState, ProductFormFields, ProductFormResponse } from "../../../types/form";
import { addProduct } from "../../../services/api/productAPI";
import { ErrorMessage } from "../../../components/ui/Error/ErrorMessage";

export default function AdminProductPage() {
  const parentClassStyle = "grid grid-cols-[1fr_2.5fr] gap-10 items-center";

  const [fileName, setFileName] = React.useState<string | null>(null);

  const initialDirtyFieldState: DirtyFieldState<ProductFormFields> = {
    productName: false,
    productPrice: false,
    productCategory: false,
    productDescription: false,
    productImage: false,
  };

  const { isValidationError, handleFieldOnChange, dirtyField, handleFormSubmit, generalError } =
    useForm<DirtyFieldState<ProductFormFields>>(initialDirtyFieldState);

  const {
    productName,
    productPrice,
    productCategory,
    productDescription,
    productImage,
    productErrorFields,
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductDescription,
    setProductImage,
    setProductFormError,
    clearProductFormError,
  } = useProductStore();

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setProductImage(file.name);
    }

    handleProductFieldOnChange(e); // For dirty state
  }

  async function handleAddProductSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validateAddProductForm({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage,
    });

    if (isValidationError<Partial<ProductFormFields>>(error, setProductFormError)) return;

    const response = await handleFormSubmit<ProductFormFields, ProductFormResponse>({
      apiCall: () => addProduct({ productName, productPrice, productCategory, productDescription, productImage }),
      setError: setProductFormError,
    });

    if (response) console.log("done");
  }

  const productSetters: Record<keyof ProductFormFields, (value: string) => void> = {
    productName: setProductName,
    productPrice: setProductPrice,
    productCategory: setProductCategory,
    productDescription: setProductDescription,
    productImage: setProductImage,
  };

  function handleProductFieldOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    handleFieldOnChange<ProductFormFields>({
      fieldKey: name as keyof ProductFormFields,
      newValue: value,
      allFormValues: {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productImage,
      },
      formValueSetter: (v) => productSetters[name as keyof ProductFormFields](v),
      validateFunction: validateAddProductForm,
      setFieldErrorFunction: setProductFormError,
      clearErrorsFunction: clearProductFormError,
      dirtyField: dirtyField,
    });
  }

  return (
    <ProfileContentContainer title="Add Product">
      <div className="innerDivBackgroundColour shadow-lg shadow-black rounded-md px-20">
        <Form handleFormSubmit={handleAddProductSubmit} className="gap-[2rem] relative">
          <Input
            id="product-name"
            label="Product Name"
            name="productName"
            parentClassName={parentClassStyle}
            placeholder="Rolex"
            value={productName}
            onChange={(e) => handleProductFieldOnChange(e)}
            error={productErrorFields.productName}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-price"
            label="Product Price"
            name="productPrice"
            parentClassName={parentClassStyle}
            placeholder="199"
            type="number"
            value={productPrice}
            onChange={(e) => handleProductFieldOnChange(e)}
            error={productErrorFields.productPrice}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-category"
            label="Product Category"
            name="productCategory"
            parentClassName={parentClassStyle}
            placeholder="Digital Watch"
            value={productCategory}
            onChange={(e) => handleProductFieldOnChange(e)}
            error={productErrorFields.productCategory}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-description"
            label="Product Description"
            name="productDescription"
            parentClassName={parentClassStyle}
            placeholder="Description of the product"
            value={productDescription}
            onChange={(e) => handleProductFieldOnChange(e)}
            error={productErrorFields.productDescription}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-image"
            label="Upload Product Image"
            name="productImage"
            parentClassName="flex flex-col text-center gap-2 mt-4"
            placeholder="Upload product image"
            type="file"
            fileName={fileName}
            onChange={handleFileUpload}
            error={productErrorFields.productImage}
            useVerticalLabelErrorStyle={true}
          />

          {generalError && <ErrorMessage message={generalError} className="absolute bottom-[5.5rem]" />}
          <Button className="formButtonStyle w-[40%] self-center mt-7" textValue="Submit" />
        </Form>
      </div>
    </ProfileContentContainer>
  );
}
