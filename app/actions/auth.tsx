import { IFormReg } from "@/interfaces";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function signup(formData: IFormReg) {
  try {
    console.log("Form data being sent to the backend:", formData);
    const response = await instance.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.error("Error during signupppp:", error);
    throw error;
  }
}

export async function verCode(verificationCode: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.post(
      "/auth/verify",
      { verificationCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during verification:", error);
    throw error;
  }
}