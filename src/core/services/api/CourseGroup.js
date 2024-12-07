import http from "../interceptor";

export const GetCourseCategory = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const res = await http.get("/CourseGroup", {
      params: {
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
