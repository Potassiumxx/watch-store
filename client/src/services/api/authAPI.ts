import axios from "axios";

type loginCredentials = {
  loginEmail: string;
  loginPassword: string;
};

type registerCredentials = {
  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
};

const BACKEND_API_URL = import.meta.env.VITE_APP_API_URL;

export async function loginUser(credentials: loginCredentials) {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
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
