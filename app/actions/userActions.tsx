import { revalidatePath } from "next/cache";
import { instance } from "./axios";

export async function sidebar() {
  try {
    const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

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

export async function sendMsg(id: string, message: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.post(
      `/messages/send/${id}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during sending message:", error);
    throw error;
  }
}

export async function logout(id: string) {
  try {
    const token = localStorage.getItem("token");

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
    console.error("Error during deleting user:", error);
    throw error;
  }
}

export async function deleteChat(id: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await instance.delete(`users/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/");
    return response.data;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
}
