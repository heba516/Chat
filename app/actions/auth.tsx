import { IFormLog, IFormReg } from "@/interfaces";
import { instance } from "./axios";

export async function signup(formData: IFormReg) {
  try {
    const response = await instance.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
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

export async function signin(formData: IFormLog) {
  try {
    const response = await instance.post("/auth/login", formData);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error;
  }
}
