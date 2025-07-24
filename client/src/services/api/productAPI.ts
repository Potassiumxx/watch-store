import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constants";
import { ProductDTO, ProductFormFields, ProductFormResponse } from "../../types/productType";

export async function addProduct(productData: ProductFormFields): Promise<ProductFormResponse> {
  const formData = new FormData();
  formData.append("productName", productData.productName);
  formData.append("productPrice", productData.productPrice);
  formData.append("productCategory", productData.productCategory);
  formData.append("productDescription", productData.productDescription);
  formData.append("productQuantity", productData.productQuantity);
  formData.append("productImage", productData.productImage!);

  try {
    const response = await axios.post(`${BACKEND_API_URL}/admin/add-product`, formData);
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

export async function getAllProducts(): Promise<ProductDTO[]> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/products`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
