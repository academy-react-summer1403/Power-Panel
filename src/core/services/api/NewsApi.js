import http from "../interceptor"

export const GetListOfNews = async (
    pageNumber,
    rowsOfPage,
    sortingCol,
    sortType,
    query,
    costDown,
    costUp,
) => {
try {
    const res = await http.get("/News/AdminNewsFilterList", {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
          costDown,
          costUp,
        },
      })

      return res;
} catch (error) {
    console.log("error" , error)
    return [];
}
}


export const CreateNewsApi = async (data) => {
  try {
    const res = await http.post("/News/CreateNews", data);
    return res;
  } catch (error) {
    console.log("error" , error)
  }
};



export const GetNewsCatApi = async () => {
  try {
    const response = await http.get("/News/GetListNewsCategory");

    return response;
  } catch (error) {
    console.log(error , "error");
  }
};

