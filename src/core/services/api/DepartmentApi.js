import toast from "react-hot-toast";
import http from "../interceptor";

export const GetDepartmentApi = async () => {
  try {
    const res = await http.get("/Department");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetDepartmentById = async (id) => {
  try {
    const res = await http.get(`/Department/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateDepartmentApi = async (data) => {
  try {
    const res = await http.post("/Department", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditDepartmentApi = async (data) => {
  try {
    const res = await http.put("/Department", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};
