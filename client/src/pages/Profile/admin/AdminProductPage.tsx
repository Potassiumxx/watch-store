import * as React from "react";
import Button from "../../../components/ui/Button/Button";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { validateAddProductForm } from "../../../utils/validateForm";
import { useProductStore } from "../../../store/productStore";
import useFormError from "../../../hooks/useForm";
import { DirtyFieldState, ProductFormFields } from "../../../types/form";

export default function AdminProductPage() {
  const parentClassStyle = "grid grid-cols-[1fr_2.5fr] gap-10 items-center";

  const [fileName, setFileName] = React.useState<string | null>(null);

  const initialDirtyFieldState: DirtyFieldState = {
    productName: false,
    productPrice: false,
    productCategory: false,
    productDescription: false,
    productImage: false,
  };

  const { isValidationError } = useFormError(initialDirtyFieldState);

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
  } = useProductStore();

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setProductImage(file.name);
    }
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
    console.log(error || "No validation errors.");
  }

  return (
    <ProfileContentContainer title="Add Product">
      <div className="innerDivBackgroundColour shadow-lg shadow-black rounded-md px-20">
        <Form handleFormSubmit={handleAddProductSubmit} className="gap-12">
          <Input
            id="product-name"
            label="Product Name"
            parentClassName={parentClassStyle}
            placeholder="Rolex"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={productErrorFields.productName}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-price"
            label="Product Price"
            parentClassName={parentClassStyle}
            placeholder="199"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            error={productErrorFields.productPrice}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-category"
            label="Product Category"
            parentClassName={parentClassStyle}
            placeholder="Digital Watch"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            error={productErrorFields.productCategory}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-description"
            label="Product Description"
            parentClassName={parentClassStyle}
            placeholder="Description of the product"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            error={productErrorFields.productDescription}
            useVerticalLabelErrorStyle={true}
          />
          <Input
            id="product-image"
            label="Upload Product Image"
            parentClassName="flex flex-col text-center gap-2 mt-4"
            placeholder="Upload product image"
            type="file"
            fileName={fileName}
            onChange={handleFileUpload}
            error={productErrorFields.productImage}
            useVerticalLabelErrorStyle={true}
          />
          <Button className="formButtonStyle w-[40%] self-center mt-7" textValue="Submit" />
        </Form>
      </div>
    </ProfileContentContainer>
  );
}
