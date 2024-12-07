import http from "../interceptor";

export const GetListOfNews = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isActive
) => {
  try {
    const res = await http.get("/News/AdminNewsFilterList", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        isActive,
      },
    });

    return res;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const CreateNewsApi = async (data) => {
  try {
    const res = await http.post("/News/CreateNews", data);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetNewsCatApi = async () => {
  try {
    const response = await http.get("/News/GetListNewsCategory");

    return response;
  } catch (error) {
    console.log(error, "error");
  }
};

export const createNewsCatAPI = async (data) => {
  try {
    const response = await http.post("/News/CreateNewsCategory", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const updateNewsCatAPI = async (data) => {
  try {
    const response = await http.put("/News/UpdateNewsCategory", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const GetNewsById = async (id) => {
  try {
    const response = await http.get(`/News/${id}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const UpdateNews = async (data) => {
  try {
    const response = await http.put("/News/UpdateNews", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const activeNews = async (data) => {
  try {
    const response = await http.put("/News/ActiveDeactiveNews", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const GetNewsFilesById = async (id) => {
  try {
    const response = await http.put(`/News/GetNewsFileList?NewsId=${id}`);

    return response;
  } catch (error) {
    return false;
  }
};
