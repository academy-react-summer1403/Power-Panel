import toast from "react-hot-toast";
import http from "../interceptor";

export const AddSchedualAtomatic = async (data, id) => {
  try {
    const res = await http.post(
      `/Schedual/AddSchedualAutomatic?currentCurseId=${id}`,
      [data]
    );
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const UpdateSchedual = async (data, id) => {
  try {
    const res = await http.put(
      `/Schedual/UpdateSchedualSingle?currentCurseId=${id}`,
      data
    );
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const AddSchedualSingle = async (data, id) => {
  try {
    const res = await http.post(
      `/Schedual/AddSchedualSingle?currentCurseId=${id}`,
      data
    );
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const GetAdminSchedual = async (startTime, endTime) => {
  try {
    const res = await http.get(
      `/Schedual/GetAdminScheduals?startDate=${startTime}&endDate=${endTime}`
    );
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const GetSchedualId = async (SchedualId) => {
  try {
    const res = await http.get(`/Schedual/GetStudentScheduals/${SchedualId}`);
    return res;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
