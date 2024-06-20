import axios from "axios";
import { getAuthHeaders, handleRequestError } from "../config/httpCommon";

const baseUrl = process.env.REACT_APP_API_URL;

// Function to fetch all comments
export const getComments = async () => {
  try {
    const response = await axios.get(`${baseUrl}/comments`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to delete a comment by ID
export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/comments/admin/${id}`, getAuthHeaders());
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to fetch last comments by users
export const getLastCommentUsers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/comments/users`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
