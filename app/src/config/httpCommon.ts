import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";
const baseUrl = process.env.REACT_APP_API_URL;
const token = getTokenFromLocalStorage();

// Function to get auth headers
export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const handleAxiosError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    throw new Error(err.response?.data.message || err.message);
  } else {
    throw new Error("An unexpected error occurred");
  }
};
