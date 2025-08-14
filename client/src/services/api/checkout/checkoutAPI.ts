import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constants";

export async function placeOrder(orderData: {
  userId: string;
  dropLocation: string;
  phoneNumber: string;
  items: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }[];
}) {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/checkout`, orderData);
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
