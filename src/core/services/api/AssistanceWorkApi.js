import toast from "react-hot-toast";
import http from "../interceptor";

export const GetAssistanceWorkApi = async () => {
  try {
    const res = await http.get("/AssistanceWork");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetAssistanceWorkById = async (id) => {
  try {
    const res = await http.get(`/AssistanceWork/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateAssistanceWorkApi = async (data) => {
  try {
    const res = await http.post("/AssistanceWork", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditAssistanceWorkApi = async (data) => {
  try {
    const res = await http.put("/AssistanceWork", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};
