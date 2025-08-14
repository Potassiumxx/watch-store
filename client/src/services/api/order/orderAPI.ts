import axios from "axios";
import { BACKEND_API_URL } from "../../../utils/constants";

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
