// ** React Import
import { useState } from "react";

// ** Reactstrap Imports
import { Button, Col, Label } from "reactstrap";

// ** Store & Actions
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { creatUser } from "../core/services/api/CreateUser";

const AddUser = () => {
  const Validation = yup.object().shape({
    firstName: yup.string().required("این فیلد الزامی است"),
    lastName: yup.string().required("این فیلد الزامی است"),
    gmail: yup.string().required("این فیلد الزامی است"),
    phoneNumber: yup.string().required("این فیلد الزامی است"),
    password: yup.string().required("این فیلد الزامی است"),
  });

  const OnSubmite = async (value) => {
    console.log(value)
    const user = {
      firstName: value.firstName,
      lastName: value.lastName,
      gmail: value.gmail,
      phoneNumber: value.phoneNumber,
      password: value.password,
    };

      try {
         await creatUser(user);
      } catch (error) {
        console.log("error")
      }
  };

  return (
    <div className="invoice-add-wrapper">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          gmail: "",
          phoneNumber: "",
          password: "",
        }}
        onSubmit={(value) => OnSubmite(value)}
        validationSchema={Validation}
      >
        <Form>
          <div className="w-100 mb-1">
            <Label className=" form-label" for="firstName">
              نام <span className="text-danger">*</span>
            </Label>
            <Field
              className="w-100 p-1 text-center"
              name="firstName"
              placeholder="John"
            />
            <ErrorMessage className="text-center" name="firstName" component={"p"} />
          </div>
          <div className="w-100 mb-1">
            <Label className="w-100 form-label" for="lastName">
              نام خانوادگی <span className="text-danger">*</span>
            </Label>

            <Field
              className="w-100 p-1 text-center"
              name="lastName"
              placeholder="Doe"
            />
            <ErrorMessage className="text-center" name="lastName" component={"p"} />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="gmail">
              ایمیل <span className="text-danger">*</span>
            </Label>

            <Field
              type="email"
              name="gmail"
              placeholder="john.doe@example.com"
              className="w-100 p-1 text-center"
            />
            <ErrorMessage className="text-center" name="gmail" component={"p"} />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="phoneNumber">
              شماره موبایل <span className="text-danger">*</span>
            </Label>

            <Field
              className="w-100 p-1 text-center"
              name="phoneNumber"
              placeholder="*********09"
            />
            <ErrorMessage className="text-center" name="phoneNumber" component={"p"} />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="password">
              رمز عبور <span className="text-danger">*</span>
            </Label>

            <Field
              className="w-100 p-1 text-center"
              name="password"
              placeholder="*********"
            />
            <ErrorMessage className="text-center" name="password" component={"p"} />
          </div>
          <Label className="form-label" for="user-role">
            نقش کاربر
          </Label>
          <div className="mb-1">
            <div className="form-check form-check-inline">
              <Field
                className="w-100 p-1 text-center"
                type="checkbox"
                name="isStudent"
                // onChange={handleStudentCheckBox}
              />
              <ErrorMessage className="text-center" name="isStudent" component={"p"} />

              <Label for="isStudent" className="form-check-label">
                دانشجو
              </Label>
            </div>
            <div className=" form-check form-check-inline">
              <Field
                className="w-100 p-1 text-center"
                type="checkbox"
                name="isTeacher"
                // onChange={handleTeacherCheckBox}
              />
              <ErrorMessage className="text-center" name="isTeacher" component={"p"} />

              <Label for="isTeacher" className="form-check-label">
                استاد
              </Label>
            </div>
          </div>

          <Button type="submit" className="me-1 w-40" color="primary">
            ثبت
          </Button>
          <Button
            className="w-40 "
            type="reset"
            color="secondary"
            outline
            // onClick={toggleSidebar}
          >
            انصراف
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;
