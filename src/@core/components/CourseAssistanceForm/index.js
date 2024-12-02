import {
  Button,
  Col,
  FormGroup,
  Label,
  Row,
  FormFeedback,
  Form,
} from "reactstrap";

import Select from "react-select";
import * as yup from "yup";
import makeAnimated from "react-select/animated";
import { selectThemeColors } from "../../../utility/Utils";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import {
  CreateCourseAssistanceApi,
  EditCourseAssistanceApi,
} from "../../../core/services/api/CourseAssistanceApi";
import { GetTechListAPI } from "../../../core/services/api/GetCourseTech";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertOptions } from "../../../utility/ConvertHelper";
import { getItem } from "../../../core/services/common/storage.services";

const CourseAssistanceForm = ({ Data }) => {
  const [CourseAssistance, setCourseAssistance] = useState([]);

  const Validation = yup.object().shape({
    courseId: yup.string().required("این فیلد الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, 
  } = useForm({
    defaultValues: {
      courseId: Data ? Data.courseId : "", 
    },
    resolver: yupResolver(Validation),
  });

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const formattedData = {
      id: Data ? Data.id : undefined,
      courseId: value.courseId,
      userId: getItem("userId"),
    };

    try {
      const res = Data
        ? await EditCourseAssistanceApi(formattedData)
        : await CreateCourseAssistanceApi(formattedData);
      if (res.success === true) {
        navigate("/CourseAssistanceList");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchDep = async () => {
      try {
        const res = await GetTechListAPI();

        const options = convertOptions(res.courseDtos);

        setCourseAssistance(options);
        
        if (Data) {
          const selectedOption = options.find(option => option.value === Data.courseId);
          if (selectedOption) {
            setValue("courseId", selectedOption.value); 
          }
        }
      } catch (error) {
        console.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchDep();
  }, [Data, setValue]); 

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form
            className="border p-4 shadow-sm rounded"
            onSubmit={handleSubmit((values) => OnSubmit(values))}
          >
            <h4 className="mb-4 text-center"> {Data ? "ویرایش" : "ایجاد"}  دوره کمکی جدید</h4>

            <FormGroup className="mb-3">
              <Label for="courseId">دوره</Label>
              <Controller
                name="courseId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="react-select"
                    theme={selectThemeColors}
                    classNamePrefix="select"
                    options={CourseAssistance}
                    isClearable
                    components={animatedComponents}
                    value={CourseAssistance.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                  />
                )}
              />
              {errors.courseId && (
                <FormFeedback className="d-block">
                  {errors.courseId.message}
                </FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/CourseAssistanceList"
                color="secondary"
                outline
                type="reset"
              >
                انصراف
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CourseAssistanceForm;
