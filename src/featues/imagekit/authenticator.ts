import { api } from "@/axios/api";

export const authenticator = async () => {
  try {
    const response = await api.get("/products");
    console.log(response, "Authenticator == CreateCourse ==");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch ImageKit auth", error);
    throw error;
  }
};
