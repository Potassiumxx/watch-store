import * as React from "react";
import { BaseFormFieldProps } from "../../../../types/form";
import Loader from "../../Loader/Loader";
import { getAllProductCategories } from "../../../../services/api/productAPI";
import { CategoryDTO } from "../../../../types/productType";

interface SelectFieldProps extends BaseFormFieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {

}

export default function SelectField({ id, ...attributes }: SelectFieldProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null | unknown>(null);
  const [options, setOptions] = React.useState<CategoryDTO[]>([]);

  async function fetchCategoryOptions() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProductCategories();
      setOptions(data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchCategoryOptions();
  }, []);

  if (isLoading) return <Loader />

  if (error) return <span>Could not get category options.</span>

  if (options.length === 0) return <span className="text-white">No category to select. Add a category first.</span>

  return (
    <select
      id={id} {...attributes}
      className={`formElementDefaultStyling ${error ? "formElementErrorStyling" : null}`}
    >
      {options.map((option) => (
        <option value={option.categoryName.toLowerCase()} key={option.id}>
          {option.categoryName}
        </option>
      ))}
    </select>
  )
}
