import toast from "react-hot-toast";
import http from "../interceptor";

export const GetCourseAssistanceApi = async () => {
  try {
    const res = await http.get("/CourseAssistance");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetCourseAssistanceById = async (id) => {
  try {
    const res = await http.get(`/CourseAssistance/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateCourseAssistanceApi = async (data) => {
  try {
    const res = await http.post("/CourseAssistance", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditCourseAssistanceApi = async (data) => {
  try {
    const res = await http.put("/CourseAssistance", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};
