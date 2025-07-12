import * as React from "react";
import Button from "../../../components/ui/Button/Button";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
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
import { ErrorMessage } from "../../../components/ui/Error/ErrorMessage";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper/FormFieldWrapper";
import Textarea from "../../../components/ui/Textarea/Textarea";

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
        <Form handleFormSubmit={handleAddProductSubmit} className="gap-[2rem] relative">
          <FormFieldWrapper
            label="Product Name"
            id="product-name"
            useVerticalLabelErrorStyle={true}
            error={productStringErrorFields.productName}
            positionRow={true}>
            <Input
              id="product-name"
              name="productName"
              placeholder="Rolex"
              value={productName}
              onChange={(e) => handleProductFieldOnChange(e)}
              error={productStringErrorFields.productName}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Product Price"
            id="product-price"
            useVerticalLabelErrorStyle={true}
            error={productStringErrorFields.productPrice}
            positionRow={true}>
            <Input
              id="product-price"
              name="productPrice"
              placeholder="199"
              type="number"
              value={productPrice}
              onChange={(e) => handleProductFieldOnChange(e)}
              error={productStringErrorFields.productPrice}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Product Category"
            id="product-category"
            useVerticalLabelErrorStyle={true}
            error={productStringErrorFields.productCategory}
            positionRow={true}>
            <Input
              id="product-category"
              name="productCategory"
              placeholder="Digital Watch"
              value={productCategory}
              onChange={(e) => handleProductFieldOnChange(e)}
              error={productStringErrorFields.productCategory}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Product Description"
            id="product-description"
            useVerticalLabelErrorStyle={true}
            error={productStringErrorFields.productDescription}
            positionRow={true}>
            <Textarea
              id="product-description"
              name="productDescription"
              placeholder="Description of the product"
              value={productDescription}
              onChange={(e) => handleProductFieldOnChange(e)}
              error={productStringErrorFields.productDescription}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Product Quantity"
            id="product-quantity"
            useVerticalLabelErrorStyle={true}
            error={productStringErrorFields.productQuantity}
            positionRow={true}>
            <Input
              id="product-quantity"
              name="productQuantity"
              placeholder="Quantity"
              type="number"
              value={productQuantity}
              onChange={(e) => handleProductFieldOnChange(e)}
              error={productStringErrorFields.productQuantity}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Upload Product Image"
            id="product-image"
            useVerticalLabelErrorStyle={true}
            error={productFileErrorFields.productImage}
            isInputTypeFile={true}
            labelClassName="w-full"
            errorStyleClass="text-center">
            <Input
              id="product-image"
              name="productImage"
              placeholder="Upload product image"
              type="file"
              fileName={fileName}
              onChange={handleFileUpload}
              error={productFileErrorFields.productImage}
            />
          </FormFieldWrapper>

          {generalError && <ErrorMessage message={generalError} className="absolute bottom-[5.5rem]" />}
          <Button className="formButtonStyle w-[40%] self-center mt-7" textValue="Submit" />
        </Form>
      </div>
    </ProfileContentContainer>
  );
}
