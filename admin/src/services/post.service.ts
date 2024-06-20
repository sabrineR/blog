import axios from "axios";
import { getAuthHeaders, handleRequestError } from "../config/httpCommon";
const baseUrl = process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/posts`);
    return data;
  } catch (err) {
      handleRequestError(err);
    }
  }

export const deletePost = async (id: number) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/posts/admin/${id}`, getAuthHeaders());
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};
