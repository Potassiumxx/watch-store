import axios from "axios";
import { LoginResponse } from "../../types/form";

interface loginCredentials {
  loginEmail: string;
  loginPassword: string;
}

interface registerCredentials {
  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
}

const BACKEND_API_URL = import.meta.env.VITE_APP_API_URL;

/**
 * API function - Send login data to the backend
 *
 * @param credentials Login data, e.g., email and password values/data
 */
export async function loginUser(credentials: loginCredentials): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/login`, credentials);
    console.log(response);
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
export async function registerUser(credentials: registerCredentials) {
  try {
    console.log(credentials);
    const response = await axios.post(`${BACKEND_API_URL}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error;
  }
}
