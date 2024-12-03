import http from "../interceptor";

export const GetAllJob = async () => {
  try {
    const res = await http.get("/SharePanel/GetJobHistoriesAdmin");
    return res;
  } catch (error) {
    return null;
  }
};

export const CreateJob = async (data) => {
  try {
    const res = await http.post("/SharePanel/CreateJobHistory" , data);
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
