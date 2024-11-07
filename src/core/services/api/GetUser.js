import http from "../interceptor";

export const GetAllUser = async (          
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  costDown,
  costUp,) => {
  try {

    const Res = await http.get("/User/UserMannage", {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
          costDown,
          costUp,
        },
      });
    return Res;
  } catch (error) {
    console.log("error", error);
  }
};
