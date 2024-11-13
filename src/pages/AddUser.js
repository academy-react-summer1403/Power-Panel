// ** React Import
import { useState } from "react";

// ** Reactstrap Imports
import { Button, Col, FormGroup, Label, Row, FormFeedback } from "reactstrap";

// ** Store & Actions
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { creatUser } from "../core/services/api/CreateUser";
import { Link } from "react-router-dom";

const AddUser = () => {
  const Validation = yup.object().shape({
    firstName: yup.string().required("این فیلد الزامی است"),
    lastName: yup.string().required("این فیلد الزامی است"),
    gmail: yup.string().email("ایمیل دشوار است").required("این فیلد الزامی است"),
    phoneNumber: yup.string().required("این فیلد الزامی است"),
    password: yup.string().required("این فیلد الزامی است"),
  });

  const OnSubmite = async (value) => {
    console.log(value);
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
      console.log("error");
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
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">
                    نام <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className={`form-control ${
                      errors.firstName && touched.firstName ? "is-invalid" : ""
                    }`}
                    name="firstName"
                    placeholder="John"
                  />
                  <ErrorMessage name="firstName" component={FormFeedback} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">
                    نام خانوادگی <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className={`form-control ${
                      errors.lastName && touched.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    placeholder="Doe"
                  />
                  <ErrorMessage name="lastName" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="gmail">
                    ایمیل <span className="text-danger">*</span>
                  </Label>
                  <Field
                    type="email"
                    name="gmail"
                    placeholder="john.doe@example.com"
                    className={`form-control ${
                      errors.gmail && touched.gmail ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage name="gmail" component={FormFeedback} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phoneNumber">
                    شماره موبایل <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className={`form-control ${
                      errors.phoneNumber && touched.phoneNumber ? "is-invalid" : ""
                    }`}
                    name="phoneNumber"
                    placeholder="*********09"
                  />
                  <ErrorMessage name="phoneNumber" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">
                    رمز عبور <span className="text-danger">*</span>
                  </Label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                    placeholder="*********"
                  />
                  <ErrorMessage name="password" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label className="form-label" for="user-role">
                نقش کاربر
              </Label>
              <div className="form-check">
                <Field
                  className="form-check-input"
                  type="checkbox"
                  name="isStudent"
                />
                <Label for="isStudent" className="form-check-label">
                  دانشجو
                </Label>
              </div>
              <div className="form-check">
                <Field
                  className="form-check-input"
                  type="checkbox"
                  name="isTeacher"
                />
                <Label for="isTeacher" className="form-check-label">
                  استاد
                </Label>
              </div>
            </FormGroup>

            <Button type="submit" color="primary" className="me-1">
              ثبت
            </Button>
            <Button tag={Link} to="/Dashboard" color="secondary" outline type="reset">
              انصراف
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
