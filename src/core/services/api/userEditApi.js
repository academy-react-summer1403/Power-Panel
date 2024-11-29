import toast from "react-hot-toast";
import http from "../interceptor";

export const EditUserApi = async (user) => {
  try {
    const res = await http.put("/User/UpdateUser", user);

    return res;
  } catch (error) {
    toast.error("Error" , error);
    return false;
  }
};

