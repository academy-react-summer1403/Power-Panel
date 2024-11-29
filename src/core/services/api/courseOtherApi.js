import toast from "react-hot-toast"
import http from "../interceptor"


export const GetAllCourseLevel = async () => {
    try {
        const res = await http.get("/CourseLevel/GetAllCourseLevel")
        return res
    } catch (error) {
        toast.error("Error", error)
        return null
    }
}


export const CreateCourseLevelApi = async (date) => {
    try {
        const res = await http.post("/CourseLevel" , date)
        return res
    } catch (error) {
        toast.error("Error", error)
        return null
    }
}