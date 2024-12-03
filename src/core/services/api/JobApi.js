import http from "../interceptor";

export const GetAllJob = async () => {
  try {
    const res = await http.get("/SharePanel/GetJobHistoriesAdmin");
    return res;
  } catch (error) {
    return null;
  }
};


export const GetJobById = async (id) => {
  try {
    const res = await http.get(`/SharePanel/GetJobHistory?HistoryId=${id}`);
    return res.singleJob;
  } catch (error) {
    return null;
  }
};

export const CreateJobApi = async (data) => {
  try {
    const res = await http.post("/SharePanel/CreateJobHistory" , data);
    return res;
  } catch (error) {
    return null;
  }
};


export const DeleteJob = async (id) => {
    console.log(id)
  try {
    const res = await http.delete(`/SharePanel/DeleteJobHistory?HistoryId=${id}`);
    return res;
  } catch (error) {
    return null;
  }
};


export const UpdateJob = async (data) => {
  try {
    const res = await http.post("/SharePanel/UpdateJobHistory" , data);
    return res;
  } catch (error) {
    return null;
  }
};
