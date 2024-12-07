import http from "../interceptor";

export const getCourseListApi = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  costDown,
  costUp,
  techCount,
  listTech,
  courseLevelId,
  courseTypeId,
  startDate,
  endDate,
  teacherId
) => {
  try {
    const res = await http.get("/Home/GetCoursesWithPagination", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        costDown,
        costUp,
        techCount,
        listTech,
        courseLevelId,
        courseTypeId,
        startDate,
        endDate,
        teacherId,
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
