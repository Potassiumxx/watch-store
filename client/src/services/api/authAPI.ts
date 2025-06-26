import axios from "axios";
import { LoginAndRegisterResponse } from "../../types/form";
import { BACKEND_API_URL } from "../../utils/constants";

interface loginCredentials {
  loginEmail: string;
  loginPassword: string;
}

interface registerCredentials {
  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
}

/**
 * API function - Send login data to the backend
 *
 * @param credentials Login data, e.g., email and password values/data
 */
export async function loginUser(credentials: loginCredentials): Promise<LoginAndRegisterResponse> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}

/**
 * API function - Send registration data to the backend
 *
 * @param credentials Registration data, e.g., email, password and username
 */
export async function registerUser(credentials: registerCredentials): Promise<LoginAndRegisterResponse> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.response?.data);
      console.error(
        "If you're a user reading this, the error you're seeing is most likely not my fault. You can try blaming Axios or your ISP. Unless I turned the server off, in that case, try again later!"
      );
      throw error;
    } else {
      console.error("Signup failed", error);
      throw error;
    }
  }
}
