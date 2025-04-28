import { IFormLog, IFormReg } from "@/interfaces";
import { instance } from "./axios";
import Cookies from "js-cookie";

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
    const token = Cookies.get("token");

    // if (!token) {
    //   throw new Error("No token found in localStorage.");
    // }

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
    console.log(response.data.data.user);
    const res = response.data.data.user;
    console.log(res);

    Cookies.set("token", res.token, {
      expires: 7, // مدة الكوكي (7 أيام)
      path: "/", // متاحة في كل الموقع
    });

    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error;
  }
}
