import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

const token = getTokenFromLocalStorage();

// Function to get auth headers
export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Function to handle errors
export const handleRequestError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || error.message);
  } else {
    throw new Error("An unexpected error occurred");
  }
};
