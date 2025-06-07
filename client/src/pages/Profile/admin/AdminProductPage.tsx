import * as React from "react";
import Button from "../../../components/ui/Button/Button";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
import ProfileContentContainer from "../container/ProfileContentContainer";

export default function AdminProductPage() {
  const parentClassStyle = "grid grid-cols-[1fr_2.5fr] gap-10 items-center";
  const [fileName, setFileName] = React.useState<string | null>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  async function handleAddProductSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("ok");
  }
  return (
    <>
      <ProfileContentContainer title="Add Product">
        <div className="innerDivBackgroundColour shadow-lg shadow-black rounded-md px-20">
          <Form handleFormSubmit={handleAddProductSubmit} className="gap-12">
            <Input id="product-name" label="Product Name" parentClassName={parentClassStyle} placeholder="Rolex" />
            <Input
              id="product-price"
              label="Product Price"
              parentClassName={parentClassStyle}
              placeholder="199"
              type="number"
              inputClassName="no-spinner"
            />
            <Input
              id="product-category"
              label="Product Category"
              parentClassName={parentClassStyle}
              placeholder="Digital Watch"
            />
            <Input
              id="product-description"
              label="Product Description"
              parentClassName={parentClassStyle}
              placeholder="Description of the product"
            />
            <Input
              id="product-image"
              label="Upload Product Image"
              parentClassName="flex flex-col justify-center gap-10 mt-5"
              placeholder="Description of the product"
              type="file"
              fileName={fileName}
              onChange={handleFileUpload}
            />
            <Button className="formButtonStyle w-[40%] self-center mt-7" textValue="Submit" />
          </Form>
        </div>
      </ProfileContentContainer>
    </>
  );
}
