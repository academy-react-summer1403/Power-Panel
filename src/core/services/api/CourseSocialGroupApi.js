import toast from "react-hot-toast";
import http from "../interceptor";

export const GetCourseSocialGroupApi = async () => {
  try {
    const res = await http.get("/CourseSocialGroup");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetCourseSocialGroupById = async (id) => {
  try {
    const res = await http.get(`/CourseSocialGroup/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateCourseSocialGroupApi = async (data) => {
  try {
    const res = await http.post("/CourseSocialGroup", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditCourseSocialGroupApi = async (data) => {
  try {
    const res = await http.put("/CourseSocialGroup", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};
