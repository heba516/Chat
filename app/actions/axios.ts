import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});