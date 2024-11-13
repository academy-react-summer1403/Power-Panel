import http from "../interceptor"

export const ApiLogin = async (user) => {
    try {
        const Res = await http.post("/Sign/Login", user)
        return Res;
    } catch (error) {
        console.log(error , "error")
    }
}