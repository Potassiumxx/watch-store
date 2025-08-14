import axios from "axios";
import { LoginAndRegisterResponse } from "../../../types/authType";
import { BACKEND_API_URL } from "../../../utils/constants";

interface UpdateUsernameCredentials {
  updatedUsername: string;
  userEmail: string;
}

export async function updateUsername(credentials: UpdateUsernameCredentials): Promise<LoginAndRegisterResponse> {
  try {
    const response = await axios.put(`${BACKEND_API_URL}/user/update-username`, credentials);
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
