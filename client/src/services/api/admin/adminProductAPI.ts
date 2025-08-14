import axios from "axios";
import { ProductFormFields, ProductFormResponse } from "../../../types/productType";
import { BACKEND_API_URL } from "../../../utils/constants";

function appendFormData(productData: ProductFormFields): FormData {
  const formData = new FormData();
  formData.append("productName", productData.productName);
  formData.append("productPrice", productData.productPrice);
  formData.append("productCategory", productData.productCategory);
  formData.append("productDescription", productData.productDescription);
  formData.append("productQuantity", productData.productQuantity);

  if (productData.productImage) {
    formData.append("productImage", productData.productImage);
  }

  return formData;
}

export async function addProduct(productData: ProductFormFields): Promise<ProductFormResponse> {
  const formData = appendFormData(productData);
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

export async function updateProduct(productID: string, productData: ProductFormFields): Promise<ProductFormResponse> {
  const formData = appendFormData(productData);
  try {
    const response = await axios.put(`${BACKEND_API_URL}/admin/update-product/${productID}`, formData);
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

export async function deleteProduct(productID: number): Promise<ProductFormResponse> {
  try {
    const response = await axios.delete(`${BACKEND_API_URL}/admin/delete-product/${productID}`);
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
