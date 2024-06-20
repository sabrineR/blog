import { ICreateComment } from "../utils/commentInterface";
import { axiosInstance, handleAxiosError } from "../config/httpCommon";

export const addComment = async (payload: ICreateComment) => {
  try {
    const response = await axiosInstance.post("/comments", payload);
    return response.data;
  } catch (err: any) {
    handleAxiosError(err);
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/comments/${id}`);
    return response.data;
  } catch (err: any) {
    handleAxiosError(err);
  }
};

export const updateComment = async (
  id: number,
  payload: Partial<ICreateComment>
) => {
  try {
    const response = await axiosInstance.put(`/comments/${id}`, payload);
    return response.data;
  } catch (err: any) {
    handleAxiosError(err);
  }
};
