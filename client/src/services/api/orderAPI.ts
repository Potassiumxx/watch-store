import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constants";
import { OrderResponseDTO } from "../../types/orderType";

export async function getAllOrders(): Promise<OrderResponseDTO[]> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/admin/orders`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSpecificOrder(userID: string) {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/orders/user/${userID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
