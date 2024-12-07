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


export const GetBuildingById = async (id) =>{
    try {
        const res = await http.get(`/Building/${id}`)
        return res
    } catch (error) {
        toast.error("Error getting" , error)
        return null
    }
}


export const UpdateBuildings = async (data) =>{
    try {
        const res = await http.put("/Building" , data)
        return res
    } catch (error) {
        toast.error("Error post" , error)
        return null
    }
}

export const CreateBuildings = async (data) =>{
    try {
        const res = await http.post("/Building" , data)
        return res.data
    } catch (error) {
        toast.error("Error post" , error)
        return null
    }
}