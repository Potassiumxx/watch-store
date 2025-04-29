import axios from "axios";

interface loginCredentials {
  loginEmail: string;
  loginPassword: string;
}

interface registerCredentials {
  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
}

interface loginData {
  email: string;
  password: string;
  username: string;
}

const BACKEND_API_URL = import.meta.env.VITE_APP_API_URL;

export async function loginUser(credentials: loginCredentials): Promise<loginData> {
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
