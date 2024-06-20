import axios from "axios";
import { loginData } from "../utils/interfaceUser";
import { registerData } from "../utils/registerInterface";
import { handleAxiosError } from "../config/httpCommon";

const baseUrl = process.env.REACT_APP_API_URL;

export const login = async (data: loginData) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data);
    const { token, userId, imagePath, isAdmin } = response.data;
    if (isAdmin) {
      throw new Error("Unauthorized");
    }
    // Store relevant data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("imagePath", imagePath);
    localStorage.setItem("isAdmin", isAdmin);

    return response.data;
  } catch (err: any) {
    handleAxiosError(err);
  }
};

export const register = async (data: registerData) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, data);
    return response.data;
  } catch (err: any) {
    handleAxiosError(err);
  }
};
