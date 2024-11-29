import toast from "react-hot-toast"
import http from "../interceptor"


export const GetAllCourseLevel = async () => {
    try {
        const res = await http.get("/CourseLevel/GetAllCourseLevel")
        return res
    } catch (error) {
        toast.apply("Error", error)
        return null
    }
}