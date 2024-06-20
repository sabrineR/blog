import { ICreatePost } from "../utils/interfacePost";
import { axiosInstance, handleAxiosError } from "../config/httpCommon";

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const addPost = async (payload: ICreatePost) => {
  try {
    const response = await axiosInstance.post("/posts", payload);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/posts/${id}`);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const updatePost = async (id: number, payload: Partial<ICreatePost>) => {
  try {
    const response = await axiosInstance.put(`/posts/${id}`, payload);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
