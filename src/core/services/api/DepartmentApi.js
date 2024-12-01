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
