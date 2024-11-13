import * as yup from "yup";

export const LoginVal = yup.object().shape({
    phoneOrGmail: yup.string().required("این فیلد الزامی است"),
    password: yup.string().required("این فیلد الزامی است"),
    rememberMe: yup.boolean(),
});