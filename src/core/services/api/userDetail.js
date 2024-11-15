import http from "../interceptor"

export const GetUserInfo = async () => {
    try {
        const res = await http.get("/SharePanel/GetProfileInfo")
        return res
    } catch (error) {
        console.log(error , "Error getting profile info")
    }
}

export const getUserById = async (userId) => {
    try {
      const response = await http.get(`/User/UserDetails/${userId}`);
  
      return response;
    } catch (error) {
      return false;
    }
  };

  export const DeleteUser = async (userId) => {
    try {
      const response = await http.delete("/User/DeleteUser", {
        data: {
          userId,
        },
      });
  
      return response;
    } catch (error) {
      return false;
    }
  };