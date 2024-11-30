import toast from "react-hot-toast";
import http from "../interceptor";

export const GetAllTerms = async () => {
  try {
    const res = await http.get("/Term");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetTermById = async (id) => {
  try {
    const res = await http.get(`/Term/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateTerms = async (data) => {
  try {
    const res = await http.post("/Term", data);
    return res;
  } catch (error) {
    toast.error("Error posting", error);
    return null;
  }
};

export const EditTerms = async (data) => {
  try {
    const res = await http.post("/Term", data);
    return res;
  } catch (error) {
    toast.error("Error posting", error);
    return null;
  }
};
