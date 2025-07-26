import { DirtyFieldState, HandleFieldOnChangeParamter } from "../types/form";
import {
  ProductFileFormValidationReturnType,
  ProductFormFileField,
  ProductFormStringFields,
  ProductStringFormValidationReturnType,
} from "../types/productType";
import { validateFileField, validateProductFormStringFields } from "../utils/validateProductForm";
import { IsValidationErrorType } from "./useForm";

interface ValidateProductFormFieldsProps {
  stringFields: ProductFormStringFields;
  fileField: File | null;
  setStringError: (field: keyof ProductStringFormValidationReturnType, error: string) => void;
  setFileError: (field: keyof ProductFileFormValidationReturnType, error: string) => void;
  isValidationError: IsValidationErrorType;
}

interface HandleProductFieldOnChangeProps<T> {
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
  values: T;
  dirtyField: DirtyFieldState<T>;
  setStringError: (key: keyof T, error: string) => void;
  clearStringError: () => void;
  handleFieldOnChange: (args: HandleFieldOnChangeParamter<T>) => void;
  validateFunction: (fields: T) => Partial<T>;
}

interface HandleFileUploadParameter {
  e: React.ChangeEvent<HTMLInputElement>;
  validateFileFieldFunc: (
    file: File | undefined,
    field: keyof ProductFormFileField
  ) => Partial<ProductFileFormValidationReturnType>;
  setProductFormFileErrorFunc: (field: keyof ProductFormFileField, errorMessage: string) => void;
  isValidationError: IsValidationErrorType;
}

interface StoreSettersType {
  setProductName: (v: string) => void;
  setProductPrice: (v: string) => void;
  setProductCategory: (v: string) => void;
  setProductDescription: (v: string) => void;
  setProductQuantity: (v: string) => void;
  setProductFileName: (v: string) => void;
  setProductImage: (f: File | null) => void;
}

export default function useProductForm(storeSetters: StoreSettersType) {
  //  const setProductFileName = useProductStore((state) => state.setProductFileName);
  //  const setProductImage = useProductStore((state) => state.setProductImage);

  const {
    // setProductName,
    // setProductPrice,
    // setProductCategory,
    // setProductDescription,
    // setProductQuantity,
    setProductFileName,
    setProductImage,
  } = storeSetters;

  function validateProductFormFields({
    stringFields,
    fileField,
    setStringError,
    setFileError,
    isValidationError,
  }: ValidateProductFormFieldsProps) {
    const stringError = validateProductFormStringFields(stringFields);
    const fileError = validateFileField(fileField, "productImage");

    setFileError("productImage", fileError.productImage!);

    return isValidationError(stringError, setStringError) || isValidationError(fileError, setFileError);
  }

  function handleProductFieldOnChange<T extends { [K in keyof T]: string | undefined }>({
    event,
    values,
    dirtyField,
    setStringError,
    clearStringError,
    handleFieldOnChange,
    validateFunction,
  }: HandleProductFieldOnChangeProps<T>) {
    const { value, name } = event.target;
    const key = name as keyof T;

    handleFieldOnChange({
      fieldKey: key,
      newValue: value,
      allFormValues: values,
      formValueSetter: (v: string) => {
        const productSetters: Record<keyof ProductFormStringFields, (value: string) => void> = {
          productName: storeSetters.setProductName,
          productPrice: storeSetters.setProductPrice,
          productCategory: storeSetters.setProductCategory,
          productDescription: storeSetters.setProductDescription,
          productQuantity: storeSetters.setProductQuantity,
        };

        productSetters[key as keyof ProductFormStringFields]?.(v);
      },
      validateFunction: validateFunction,
      setFieldErrorFunction: setStringError,
      clearErrorsFunction: clearStringError,
      dirtyField,
    });
  }

  function handleFileUpload({
    e,
    validateFileFieldFunc,
    setProductFormFileErrorFunc,
    isValidationError,
  }: HandleFileUploadParameter) {
    const file = e.target.files?.[0];

    if (file) {
      setProductFileName(file.name);
      setProductImage(file);
    }

    const fileError = validateFileFieldFunc(file, "productImage");
    setProductFormFileErrorFunc("productImage", fileError.productImage!);

    if (isValidationError<Partial<ProductFileFormValidationReturnType>>(fileError, setProductFormFileErrorFunc)) return;
  }

  return {
    handleFileUpload,
    validateProductFormFields,
    handleProductFieldOnChange,
  };
}
