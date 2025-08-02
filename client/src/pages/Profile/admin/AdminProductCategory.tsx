import Form from "../../../components/ui/Form/Form";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper/FormFieldWrapper";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { useProductStore } from "../../../store/productStore";
import * as React from "react";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { addNewCategory } from "../../../services/api/productAPI";

export default function AdminProductCategory() {
  const newProductCategory = useProductStore((state) => state.newProductCategory);
  const setNewProductCategory = useProductStore((state) => state.setNewProductCategory);
  const [error, setError] = React.useState < string | null > (null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newProductCategory === "") return setError("Product category cannot be empty");

    await addNewCategory(newProductCategory);

    console.log("submitted " + newProductCategory);

  }

  function handleOnChange(e) {
    e.preventDefault();
    const value = e.target.value;

    if (error && value !== "") setError(null);

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
