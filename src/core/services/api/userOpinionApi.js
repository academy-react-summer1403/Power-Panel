import axios from "axios";


export const GetOpinion = async () => {
    try {
        const res = await axios.get("https://66103a720640280f219ca24e.mockapi.io/card/Produc");
        return res.data;
      } catch (error) {
        console.log(error, "Error posting");
        return null;
      }
}