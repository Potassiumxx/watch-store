import axios from "axios";
import { BACKEND_API_URL } from "../../../utils/constants";

export async function addNewCategory(categoryName: string): Promise<string> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/admin/categories/add-category`, { categoryName });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      console.log("Unexpected error:", error);
      throw error;
    }
  }
}

export async function updateCategory(categoryID: number, categoryName: string): Promise<string> {
  try {
    const response = await axios.put(`${BACKEND_API_URL}/admin/categories/update-category/${categoryID}`, { categoryName });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      console.log("Unexpected error:", error);
      throw error;
    }
  }
}

export async function deleteCategory(categoryID: number): Promise<string> {
  try {
    const response = await axios.delete(`${BACKEND_API_URL}/admin/categories/delete-category/${categoryID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      console.log("Unexpected error:", error);
      throw error;
    }
  }
}
