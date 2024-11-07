import http from "../interceptor"

export const creatUser = async (user) => {
    try {
      const res = await http.post("/User/CreateUser", user);
  
      return res;
    } catch (error) {
      return false;
    }
  };