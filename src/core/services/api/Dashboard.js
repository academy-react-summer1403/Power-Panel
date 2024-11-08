import http from "../interceptor";

export const DashBoardAPI = async () => {
  try {
    const response = await http.get("/Report/DashboardReport");

    return response;
  } catch (error) {
    return false;
  }
};
