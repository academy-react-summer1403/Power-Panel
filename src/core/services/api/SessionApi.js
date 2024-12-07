import http from "../interceptor";

export const getSession = async (sessionId) => {
  try {
    const response = await http.get(
      `/Session/SessionDetail?SessionId=${sessionId}`
    );
    return response;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const GetHomeWork = async (sessionId) => {
  try {
    const response = await http.get(
      `/Session/GetSessionHomeWork?SessionId=${sessionId}`
    );
    return response;
  } catch (error) {
    toast.error("Error getting", error);
    return null;
  }
};
export const DeleteTourGroup = async (sessionId) => {
  try {
    const response = await http.delete("/Tournament/DeleteTournamentGroup", {
      data: { deleteEntityId: groupId },
    });
    return response;
  } catch (error) {
    toast.error("Error delete", error);
    return null;
  }
};
export const UpdateSession = async (BulldingData, row) => {
  try {
    const method = row ? "put" : "post";
    let url = row ? "/Session/UpdateSession" : "/Session/AddSession";
    const response = await http[method](url, BulldingData);
    return response;
  } catch (error) {
    toast.error("Error put or post", error);
    return null;
  }
};
export const UpdateHomeWork = async (BulldingData) => {
  try {
    let url = '/Session/AddSessionHomeWork'
    const response = await http.post(url , BulldingData);
    return response;
  } catch (error) {
    toast.error("Error put or post", error);
    return null;
  }
};
