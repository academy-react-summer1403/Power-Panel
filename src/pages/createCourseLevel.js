
// ** Reactstrap Imports
import { Button, Col, FormGroup, Label, Row, FormFeedback } from "reactstrap";

// ** Store & Actions
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { CreateCourseLevelApi } from "../core/services/api/courseOtherApi";
import { Link, useNavigate } from "react-router-dom";

const CreateCourseLevel = () => {
  const Validation = yup.object().shape({
    LevelName: yup.string().required("این فیلد الزامی است"),
  });

  const navigate = useNavigate()

  const OnSubmit = async (value) => {
    const date = {
      levelName: value.LevelName,
    };

    try {
      const res = await CreateCourseLevelApi(date);
      if(res.success === true){
        navigate("/CourseLevelList")
      }
      
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="invoice-add-wrapper">
      <Formik
        initialValues={{
          levelName: "",
        }}
        onSubmit={(value) => OnSubmit(value)}
        validationSchema={Validation}
      >
        {({ errors, touched }) => (
          <Form>
            <Col md={6}>
              <FormGroup>
                <Label for="LevelName">
                  نام <span className="text-danger">*</span>
                </Label>
                <Field
                  className={`form-control ${
                    errors.firstName && touched.firstName ? "is-invalid" : ""
                  }`}
                  name="LevelName"
                  placeholder="مثلا پیشرفته"
                />
                <ErrorMessage name="LevelName" component={FormFeedback} />
              </FormGroup>
            </Col>

            <Button type="submit" color="primary" className="me-1">
              ثبت
            </Button>
            <Button
              tag={Link}
              to="/CourseLevelList"
              color="secondary"
              outline
              type="reset"
            >
              انصراف
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCourseLevel;
