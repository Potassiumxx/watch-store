import axios from "axios";
import { OrderResponseDTO } from "../../../types/orderType";
import { BACKEND_API_URL } from "../../../utils/constants";

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
