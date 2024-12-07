import http from "../interceptor"

export const ManageComment = async (
    pageNumber,
    rowsOfPage,
    sortingCol,
    sortType,
    query,
    accept,
    userId
  ) => {
    try {
      const res = await http.get("/Course/CommentManagment", {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
          accept,
          userId,
        },
      });
  
      return res;
    } catch (error) {
      return false;
    }
  };
  
  
  export const deleteCourseComment = async (courseCommentId) => {
  try {
    const res = await http.delete(`/Course/DeleteCourseComment`, {
      params: {
        courseCommandId: courseCommentId,
      },
    });

    return res;
  } catch (error) {
    return false;
  }
};

export const addReply = async (comment) => {
  try {
    const response = await http.post("/Course/AddReplyCourseComment", comment);

    return response;
  } catch (error) {
    return false;
  }
};

export const acceptComment= async (commentCourseId) => {
  try {
    const response = await http.post("/Course/AcceptCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const rejectComment = async (commentCourseId) => {
  try {
    const response = await http.post("/Course/RejectCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};