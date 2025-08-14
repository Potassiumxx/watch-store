import Form from "../../../components/ui/Form/Form";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper/FormFieldWrapper";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { useProductStore } from "../../../store/productStore";
import * as React from "react";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { addNewCategory, deleteCategory, updateCategory } from "../../../services/api/admin/adminCategoryAPI";
import axios from "axios";
import { CategoryDTO } from "../../../types/productType";
import Loader from "../../../components/ui/Loader/Loader";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../../../components/ui/ConfirmModal/ConfirmModal";
import { getAllProductCategories } from "../../../services/api/category/categoryAPI";

export default function AdminProductCategory() {
  const newProductCategory = useProductStore((state) => state.newProductCategory);
  const setNewProductCategory = useProductStore((state) => state.setNewProductCategory);

  const [error, setError] = React.useState<string | undefined>("");
  const [fetchCategoriesError, setFetchCategoriesError] = React.useState<string | null>(null);
  const [updateError, setUpdateError] = React.useState<{ [categoryID: number]: string } | null>({});

  const [message, setMessage] = React.useState<string | null>(null);

  const [categories, setCategories] = React.useState<CategoryDTO[]>([]);
  const [categoryToDelete, setCategoryToDelete] = React.useState({
    id: 0,
    categoryName: "",
  })
  const [editingCategoryID, setEditingCategoryID] = React.useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
  const [hasCategoryUpdated, setHasCategoryUpdated] = React.useState<boolean>(false);

  async function handleCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newProductCategory === "") return setError("Product category cannot be empty");

    if (message) setMessage(null);

    try {
      await addNewCategory(newProductCategory);
      setMessage("Product category added.");
      setHasCategoryUpdated(true);
      setError("");
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

  async function handleCategoryUpdate(categoryID: number) {
    if (editedCategoryName === "") {
      setUpdateError(prev => ({
        ...prev,
        [categoryID]: "Category name cannot be empty",
      }));
      return;
    }

    try {
      await updateCategory(categoryID, editedCategoryName);
      setUpdateError(prev => {
        const newErrors = { ...prev };
        delete newErrors[categoryID];
        return newErrors;
      })
      setHasCategoryUpdated(true);
      setEditingCategoryID(null);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data;
        console.log(backendMessage);
        setUpdateError(prev => ({ ...prev, [categoryID]: backendMessage || "Something went wrong" }));
      } else {
        console.log("Unexpected error:", error);
        setUpdateError(prev => ({ ...prev, [categoryID]: "Unexpected error occured." }));
      }
    }
  }

  async function handleCategoryDelete(categoryID: number) {
    try {
      const response = await deleteCategory(categoryID);
      setHasCategoryUpdated(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    setIsLoading(true);
    setFetchCategoriesError(null);

    try {
      const data = await getAllProductCategories();
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) setFetchCategoriesError(error.message);
      else setFetchCategoriesError("Unknown error occurred.");
    } finally {
      setIsLoading(false);
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

  React.useEffect(() => {
    fetchCategories();
    setHasCategoryUpdated(false);
  }, [hasCategoryUpdated])

  return (
    <ProfileContentContainer title="Product Category">
      <div className="flex flex-col gap-20 w-full md:w-auto">
        <div className="innerDivBackgroundColour shadow-black shadow-lg rounded-md md:px-20">
          <h2 className="text-2xl text-white text-center py-4">Add New Category</h2>
          <Form handleFormSubmit={handleCategorySubmit}>
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
        <div className="innerDivBackgroundColour py-4 shadow-black shadow-lg rounded-md mb-10">
          <h2 className="text-2xl text-white text-center py-4">Categories</h2>
          {isLoading ? (
            <Loader />
          ) : categories.length === 0 ? (
            <div className="text-white text-center text-[22px] pt-10">
              {fetchCategoriesError ? fetchCategoriesError : "No categories to show"}
            </div>
          ) : (
            <ul className="md:w-full px-2 md:px-10 space-y-2 md:space-y-4">
              {categories.map((category) => {
                const isCategoryInUse: boolean = category.productCount > 0;
                const inEditMode = editingCategoryID === category.id;
                return (
                  <li
                    key={category.id}
                    className="flex items-center justify-between border border-white/[.5] px-2 md:px-6 py-2 md:py-4 hover:shadow-lg hover:border-white hover:shadow-md hover:shadow-gray-400 duration-200"
                  >
                    {
                      inEditMode ? (
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">

                          {
                            <div className={`${updateError ? "flex flex-col gap-2" : "flex"}`}>
                              <input
                                value={editedCategoryName}
                                autoFocus
                                onChange={(e) => {
                                  setEditedCategoryName(e.target.value);
                                  if (updateError && e.target.value !== "") setUpdateError(null);
                                  if (e.target.value === "") setUpdateError({ [category.id]: "Category name cannot be empty" });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") {
                                    setEditingCategoryID(null);
                                    setUpdateError(null);
                                  }
                                  else if (e.key === "Enter") handleCategoryUpdate(category.id);
                                }}
                                className={`outline-none px-2 bg-transparent text-white 
                                  ${updateError?.[category.id] ? "border-b-2 border-red-600" : "border-b-2 border-white"}`}
                              />
                              {updateError?.[category.id] && <span className="text-red-600 text-[13px] md:text-sm px-2">{updateError[category.id]}</span>}
                            </div>
                          }
                          <div className="flex w-full">
                            <button
                              onClick={() => {
                                handleCategoryUpdate(category.id)
                              }}
                              className="text-white hover:bg-[#1bddf3] hover:text-black px-2 rounded-sm duration-200 text-sm md:text-base">Save</button>
                            <button
                              onClick={() => {
                                setEditingCategoryID(null);
                                setUpdateError(null);
                              }}
                              className="text-white hover:bg-white hover:text-black px-2 rounded-sm duration-200 text-sm md:text-base">Cancel</button>
                          </div>
                        </div>
                      ) :
                        <div className="flex flex-col">
                          <span className="text-white font-medium md:text-lg">{category.categoryName}</span>
                          <span className="text-gray-400 text-sm">Products in use: {category.productCount}</span>
                        </div>
                    }

                    <div className="flex gap-[2px] md:gap-4">
                      {!inEditMode &&
                        <button
                          onClick={() => {
                            setEditingCategoryID(category.id);
                            setEditedCategoryName(category.categoryName);
                            setUpdateError(null);
                          }}
                          className="text-white px-2 transition rounded-sm text-2xl md:text-3xl hover:bg-white hover:text-black">
                          <CiEdit />
                        </button>
                      }
                      <button
                        onClick={() => {
                          if (!isCategoryInUse) {
                            setShowConfirmModal(true);
                            setCategoryToDelete(category);
                            setUpdateError(null);
                          }
                        }}
                        className={`text-white px-2 transition rounded-sm text-2xl md:text-3xl 
                        ${isCategoryInUse ? "cursor-not-allowed text-gray-400" : "hover:bg-red-600 hover:text-black"}`
                        }><MdDeleteOutline /></button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {
          showConfirmModal &&
          <ConfirmModal
            isOpen={true}
            message={`Are you sure you want to delete "${categoryToDelete.categoryName} category"?`}
            onConfirm={() => {
              //handleProductDelete(productToDelete.id);
              handleCategoryDelete(categoryToDelete.id);
              console.log("Deleted");
              setShowConfirmModal(false);
            }}
            onCancel={() => {
              setShowConfirmModal(false);
              setCategoryToDelete({ id: 0, categoryName: "" });
            }}
          />
        }
      </div>

    </ProfileContentContainer>
  )
}
