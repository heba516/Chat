import { instance } from "./axios";
import Cookies from "js-cookie";

export async function sidebar() {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
    throw error;
  }
}

export async function getMessages(id: string) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.get(`messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

export async function uploadProfilePhoto(profilePhoto: File) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const formData = new FormData();
    formData.append("photo", profilePhoto);

    const response = await instance.post("users/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error, adding photo:", error);
    throw error;
  }
}

export async function logout(id: string) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("logout error:", error);
    throw error;
  }
}

export async function deleteChat(id: string) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    await instance.delete(`users/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
}

export async function newConversation(name: string) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.get(`users/search?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error when adding new conversation:", error);
    throw error;
  }
}
