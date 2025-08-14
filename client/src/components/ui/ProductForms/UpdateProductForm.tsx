import * as React from "react";
import useForm from "../../../hooks/useForm";
import { ProductDTO, ProductFormResponse, ProductFormStringFields, ProductStringFormValidationReturnType } from "../../../types/productType";
import { initialProductDirtyFieldState, validateProductFormStringFields, validateFileField } from "../../../utils/validateProductForm";
import ProductForm from "./ProductForm";
import useProductForm from "../../../hooks/useProductForm";
import { useProductStore } from "../../../store/productStore";
import { updateProduct } from "../../../services/api/admin/adminProductAPI";
import { IoCloseOutline } from "react-icons/io5";
import { useUIStore } from "../../../store/uiStore";
import Backdrop from "../Backdrop/Backdrop";

interface UpdateProductFormProps {
  selectedProduct: ProductDTO;
  fetchProductFunc: () => void;
}

export default function UpdateProductForm({ selectedProduct, fetchProductFunc }: UpdateProductFormProps) {
  const { dirtyField, handleFieldOnChange, generalError, setGeneralError, isValidationError, handleFormSubmit } = useForm(initialProductDirtyFieldState);
  const productStore = useProductStore();
  const { handleFileUpload, validateProductFormFields, handleProductFieldOnChange } = useProductForm(productStore);

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
    setProductStringFormError,
    setProductFileFormError,
    clearProductStringFormError,
    clearProductFileFormError
  } = useProductStore();

  const setProductFileName = useProductStore((state) => state.setProductFileName);
  const fileName = useProductStore((state) => state.productFileName);

  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const showUpdateProductForm = useUIStore((state) => state.showUpdateProductForm);
  const setShowUpdateProductForm = useUIStore((state) => state.setShowUpdateProductForm);

  function handleFormClose() {
    setIsFormVisible(false);
    setTimeout(() => {
      if (showUpdateProductForm) setShowUpdateProductForm(false);
      // Reset the file name on close so that it does not get carried to the add product page.
      // Add product page sould initially be empty. More information about this will be provided in the future.
      setProductFileName("");
    }, 300);

  }


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

    if (!productID) return setGeneralError("No product ID. Could not update the proudct");
    const response = await handleFormSubmit<ProductStringFormValidationReturnType, ProductFormResponse>({
      apiCall: () => updateProduct(productID, { productName, productPrice, productCategory, productDescription, productQuantity, productImage }),
      setError: setProductStringFormError
    });

    if (response) {
      handleFormClose();
      fetchProductFunc();
    };

  }

  React.useEffect(() => {
    if (!selectedProduct) return;

    useProductStore.getState().setFieldValue("productID", selectedProduct.id.toString());
    useProductStore.getState().setFieldValue("productName", selectedProduct.name);
    useProductStore.getState().setFieldValue("productPrice", selectedProduct.price.toString());
    useProductStore.getState().setFieldValue("productCategory", selectedProduct.category);
    useProductStore.getState().setFieldValue("productDescription", selectedProduct.description);
    useProductStore.getState().setFieldValue("productQuantity", selectedProduct.quantity.toString());

    setProductFileName(selectedProduct.imagePath);

    clearProductStringFormError();
    clearProductFileFormError();
  }, [selectedProduct])

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleFormClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [])

  React.useEffect(() => {
    setTimeout(() => setIsFormVisible(true), 0);
  }, [])

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <Backdrop handleOnClick={handleFormClose} isVisible={isFormVisible} />
      <div
        className={`relative w-full h-full overflow-y-auto md:w-auto md:h-auto innerDivBackgroundColour rounded-md border border-white/[.5] z-50 
          ${isFormVisible ? "opacity-100" : "opacity-0"} duration-300`
        }>
        <div className="flex py-4 px-6 items-center border-b-[1px] border-white">
          <h2 className="w-full text-white justify-self-center text-2xl md:text-3xl font-semibold text-center">Update Product</h2>
          <button className="absolute right-6 text-red-600 z-50 hover:text-red-400 duration-200"
            onClick={handleFormClose}>{<IoCloseOutline size={45} />}</button>
        </div>
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
    </div>
  )
}
