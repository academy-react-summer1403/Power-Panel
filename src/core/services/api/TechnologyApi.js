import toast from "react-hot-toast";
import http from "../interceptor";

export const GetTechnologyApi = async () => {
  try {
    const res = await http.get("/Technology");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetTechnologyById = async (id) => {
  try {
    const res = await http.get(`/Technology/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateTechnologyApi = async (data) => {
  try {
    const res = await http.post("/Technology", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditTechnologyApi = async (data) => {
  try {
    const res = await http.put("/Technology", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};