import toast from "react-hot-toast";
import http from "../interceptor";

export const GetClassRoomApi = async () => {
  try {
    const res = await http.get("/ClassRoom");
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const GetClassRoomById = async (id) => {
  try {
    const res = await http.get(`/ClassRoom/${id}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};

export const CreateClassRoomApi = async (data) => {
  try {
    const res = await http.post("/ClassRoom", data);
    return res;
  } catch (error) {
    toast.error("Error post", error);
    return null;
  }
};

export const EditClassRoomApi = async (data) => {
  try {
    const res = await http.put("/ClassRoom", data);
    return res;
  } catch (error) {
    toast.error("Error edit", error);
    return null;
  }
};