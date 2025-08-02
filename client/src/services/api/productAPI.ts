import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constants";
import { ProductDTO, ProductFormFields, ProductFormResponse } from "../../types/productType";

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

export async function updateProduct(productID: string, productData: ProductFormFields) {
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

export async function deleteProduct(productID: number) {
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

export async function addNewCategory(categoryName: string) {
  try {
    console.log(categoryName);
    const response = await axios.post(`${BACKEND_API_URL}/admin/add-category`, { categoryName });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.response?.data);
      throw error;
    } else {
      console.log("Unexpected error:", error);
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
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}

export async function getProductByID(productID: number) {
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
