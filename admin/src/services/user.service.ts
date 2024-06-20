import axios from "axios";
import { getAuthHeaders, handleRequestError } from "../config/httpCommon";

const baseUrl = process.env.REACT_APP_API_URL;
// Function to fetch users
export const getUsers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/admin/users`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/admin/users/${userId}`, getAuthHeaders());
  } catch (error) {
    handleRequestError(error);
  }
};
