import toast from "react-hot-toast";
import http from "../interceptor";

export const GetStatusApi = async () => {
  try {
    const res = await http.get("/Status"); 
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetStatusById = async (id) => {
  try {
    const res = await http.get(`/Status/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateStatusApi = async (data) => {
  try {
    const res = await http.post("/Status", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditStatusApi = async (data) => {
  try {
    const res = await http.put("/Status", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};