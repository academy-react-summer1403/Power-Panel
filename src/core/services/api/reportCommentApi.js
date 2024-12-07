import axios from "axios";

export const GetReportComment = async () => {
    try {
      const res = await axios.get("https://673d05514db5a341d833bf75.mockapi.io/report/Comment-Report");
      return res.data;
    } catch (error) {
      console.log(error, "Error posting");
      return null;
    }
  };

  
