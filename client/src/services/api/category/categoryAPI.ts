import axios from "axios";
import { BACKEND_API_URL } from "../../../utils/constants";
import { CategoryDTO } from "../../../types/productType";

export async function getAllProductCategories(): Promise<CategoryDTO[]> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/product-category`);
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
