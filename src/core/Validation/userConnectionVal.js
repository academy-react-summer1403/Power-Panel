import * as yup from "yup";

export const UserConnectionVal = yup.object().shape({
  phoneNumber: yup.string(),
  gmail: yup.string(),
  recoveryEmail: yup.string(),
  telegramLink: yup.string(),
  linkdinProfile: yup.string(),
});
