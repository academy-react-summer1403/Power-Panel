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
      const res = await http.get(`/User/UserDetails/${userId}`);
  
      return res;
    } catch (error) {
      return false;
    }
  };

  export const DeleteUser = async (userId) => {
    try {
      const res = await http.delete("/User/DeleteUser", {
        data: {
          userId,
        },
      });
  
      return res;
    } catch (error) {
      return false;
    }
  };


  export const getUserSkillsById = async (userId) => {
    try {
      const res = await http.get(`/User/UserSkills/${userId}`);
  
      return res;
    } catch (error) {
      return false;
    }
  };



export const getCourseListAPI = async (
  courseId,
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const res = await http.get("/CourseUser/GetCourseUserList", {
      params: {
        courseId,
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
      },
    });

    return res;
  } catch (error) {
    return false;
  }
};

