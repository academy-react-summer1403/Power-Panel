import http from "../interceptor"

export const GetUserInfo = async () => {
    try {
        const res = await http.get("/SharePanel/GetProfileInfo")
        return res
    } catch (error) {
        console.log(error , "Error getting profile info")
    }
}