import { ProductFileFormValidationReturnType, ProductFormStringFields, ProductStringFormValidationReturnType } from "../../../types/productType";
import Button from "../Button/Button";
import { ErrorMessage } from "../Error/ErrorMessage";
import Form from "../Form/Form";
import FormFieldWrapper from "../FormFieldWrapper/FormFieldWrapper";
import Input from "../Input/Input";
import SelectField from "../Input/SelectField/SelectField";
import Textarea from "../Textarea/Textarea";

interface ProductFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  stringFieldError: ProductStringFormValidationReturnType;
  fileFieldError: ProductFileFormValidationReturnType;
  values: ProductFormStringFields;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generalError?: string | null;
  buttonTextValue?: string
}

export default function ProductForm({
  onSubmit,
  onChange,
  onFileChange,
  values,
  stringFieldError,
  fileFieldError,
  generalError,
  buttonTextValue = "Submit"
}: ProductFormProps) {
  return (

    <Form handleFormSubmit={onSubmit} className="gap-[2rem] relative">
      <FormFieldWrapper
        label="Product Name"
        id="product-name"
        useVerticalLabelErrorStyle={true}
        error={stringFieldError.productName}
        positionRow={true}>
        <Input
          id="product-name"
          name="productName"
          placeholder="Rolex"
          value={values.productName}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productName}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label="Product Price"
        id="product-price"
        useVerticalLabelErrorStyle={true}
        error={stringFieldError.productPrice}
        positionRow={true}>
        <Input
          id="product-price"
          name="productPrice"
          placeholder="199"
          type="number"
          value={values.productPrice}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productPrice}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label="Product Category"
        id="product-category"
        useVerticalLabelErrorStyle={true}
        error={stringFieldError.productCategory}
        positionRow={true}>
        {/*<Input
          id="product-category"
          name="productCategory"
          placeholder="Digital Watch"
          value={values.productCategory}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productCategory}
        />*/}
        <SelectField
          id="product-category"
          name="productCategory"
          aria-placeholder="Digital Watch"
          value={values.productCategory}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productCategory}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label="Product Description"
        id="product-description"
        useVerticalLabelErrorStyle={true}
        error={stringFieldError.productDescription}
        positionRow={true}>
        <Textarea
          id="product-description"
          name="productDescription"
          placeholder="Description of the product"
          value={values.productDescription}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productDescription}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label="Product Quantity"
        id="product-quantity"
        useVerticalLabelErrorStyle={true}
        error={stringFieldError.productQuantity}
        positionRow={true}>
        <Input
          id="product-quantity"
          name="productQuantity"
          placeholder="Quantity"
          type="number"
          value={values.productQuantity}
          onChange={(e) => onChange(e)}
          error={stringFieldError.productQuantity}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label="Upload Product Image"
        id="product-image"
        useVerticalLabelErrorStyle={true}
        error={fileFieldError.productImage}
        isInputTypeFile={true}
        labelClassName="w-full"
        errorStyleClass="text-center">
        <Input
          id="product-image"
          name="productImage"
          placeholder="Upload product image"
          type="file"
          onChange={onFileChange}
          error={fileFieldError.productImage}
        />
      </FormFieldWrapper>

      {generalError && <ErrorMessage message={generalError} className="absolute bottom-[5.5rem]" />}
      <Button className="formButtonStyle w-[40%] self-center mt-7" textValue={buttonTextValue} />
    </Form>
  )
}
