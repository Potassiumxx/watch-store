import Form from "../../../components/ui/Form/Form";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper/FormFieldWrapper";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { useProductStore } from "../../../store/productStore";
import * as React from "react";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { addNewCategory } from "../../../services/api/productAPI";
import axios from "axios";

export default function AdminProductCategory() {
  const newProductCategory = useProductStore((state) => state.newProductCategory);
  const setNewProductCategory = useProductStore((state) => state.setNewProductCategory);
  const [error, setError] = React.useState<string | undefined>("");
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newProductCategory === "") return setError("Product category cannot be empty");

    if (message) setMessage(null);

    try {
      await addNewCategory(newProductCategory);
      setMessage("Product category added.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data;
        if (backendMessage) {
          setError(backendMessage);
        } else {
          setError("Something went wrong.");
        }
      } else {
        console.log("Unexpected error:", error);
        setError("Unexpected error occurred.");
      }
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (message) setMessage(null);
    const value = e.target.value;

    if (error && value !== "") setError("");
    if (value === "") setError("Product Category cannot be empty");

    setNewProductCategory(value);
  }

  return (
    <ProfileContentContainer title="Product Category">
      <div className="innerDivBackgroundColour shadow-black shadow-lg rounded-md px-20">
        <h2 className="text-2xl text-white text-center py-4">Add New Category</h2>
        <Form handleFormSubmit={handleSubmit}>
          <FormFieldWrapper
            label="Product Category"
            id="add-product-category"
            useVerticalLabelErrorStyle={true}
            error={error}
            positionRow={true}
            onSuccessMessage={message}
          >
            <Input
              id="add-product-category"
              name="newProductCategory"
              placeholder="Digital Watch"
              value={newProductCategory}
              onChange={handleOnChange}
              error={error}
            />
          </FormFieldWrapper>
          <Button textValue="Submit" className="formButtonStyle w-[40%] self-center mt-5" />
        </Form>

      </div>

    </ProfileContentContainer>
  )
}
