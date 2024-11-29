import toast from "react-hot-toast"
import http from "../interceptor"


export const GetListOfBuildings = async () =>{
    try {
        const res = await http.get("/Building")
        return res
    } catch (error) {
        toast.error("Error getting" , error)
        return null
    }
}