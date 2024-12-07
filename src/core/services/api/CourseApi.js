import http from "../interceptor";

export const getCoursesStepOne = async () => {
  try {
    const res = await http.get("/Course/GetCreate");
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const Post = async (form) => {
  try {
    const res = await http.post("/Course", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTech = async () => {
  try {
    const res = await http.get("/Home/GetTechnologies");
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTech = async (form, getTech) => {
  try {
    const res = await http.post(
      `/Course/AddCourseTechnology?courseId=${form}`,
      getTech
    );
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetGroupsOfCourse = async () => {
  try {
    const res = await http.get("/CourseGroup");
    //console.log(result);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetCourseById = async (id) => {
  try {
    const res = await http.get(`/Course/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetEditCourse = async (courseId) => {
  try {
    const res = await http.get("/Course/GetEditCourse", {
      params: {
        courseId,
      },
    });

    return res;
  } catch (error) {
    return false;
  }
};

export const UpdateCourse = async (course) => {
  try {
    const response = await http.put("/Course", course);

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseReserveAPI = async () => {
  try {
    const res = await http.get("/CourseReserve");

    return res;
  } catch (error) {
    return false;
  }
};

export const DeleteCourseReserveAPI = async (id) => {
  try {
    const res = await http.delete("/CourseReserve", {
      data: {
        id,
      },
    });

    return res;
  } catch (error) {
    return false;
  }
};

export const SendReserveToCourseAPI = async (
  courseId,
  courseGroupId,
  studentId
) => {
  try {
    const res = await http.post("/CourseReserve/SendReserveToCourse", {
      courseId,
      courseGroupId,
      studentId,
    });

    return res;
  } catch (error) {
    return false;
  }
};

export const GetCourseGroupAPI = async (teacherId, courseId) => {
  try {
    const res = await http.get("/CourseGroup/GetCourseGroup", {
      params: {
        teacherId,
        courseId,
      },
    });

    return res;
  } catch (error) {
    return false;
  }
};

export const GetCourseGroupId = async (groupId) => {
  try {
    const res = await axiosInstance.get(`/CourseGroup/Details?Id=${groupId}`);
    return res;
  } catch (error) {
    return false;
  }
};
