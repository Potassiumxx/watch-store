import axios from "axios";
import { BACKEND_API_URL } from "../../../utils/constants";
import { ProductDTO } from "../../../types/productType";

export async function getAllProducts(): Promise<ProductDTO[]> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/products`);
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

export async function getProductByID(productID: number): Promise<ProductDTO> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/products/${productID}`);
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
