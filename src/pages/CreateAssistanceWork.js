import {
  Button,
  Col,
  FormGroup,
  Label,
  Row,
  FormFeedback,
  Form,
  Input,
} from "reactstrap";

import Select from "react-select";
import * as yup from "yup";
import makeAnimated from "react-select/animated";
import { selectThemeColors } from "../utility/Utils";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { CreateAssistanceWorkApi } from "../core/services/api/AssistanceWorkApi";
import { GetCourseAssistanceApi } from "../core/services/api/CourseAssistanceApi";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const CreateAssistanceWork = () => {
  const [AssistanceWork, setAssistanceWork] = useState([]);

  const Validation = yup.object().shape({
    worktitle: yup.string().required("این فیلد الزامی است"),
    workDescribe: yup.string().required("این فیلد الزامی است"),
    assistanceId: yup.string().required("این فیلد الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      worktitle: "",
      workDescribe: "",
      assistanceId: "",
    },
    resolver: yupResolver(Validation),
  });

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const formattedData = {
      worktitle: value.worktitle,
      workDescribe: value.workDescribe,
      assistanceId: value.assistanceId,
      workDate: new Date().toISOString(),
    };

    try {
      const res = await CreateAssistanceWorkApi(formattedData);
      if (res.success === true) {
        navigate("/AssistanceWorkList");
        toast.success("عملیات با موفقیت انجام شد!");
      } else {
        toast.error(res.ErrorMessage || "ارور ناشناخته");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchDep = async () => {
      try {
        const res = await GetCourseAssistanceApi();
        const options = res.map((item) => ({
          value: item.id,
          label: item.assistanceName,
        }));
        setAssistanceWork(options);
      } catch (error) {
        console.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchDep();
  }, []);

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form
            className="border p-4 shadow-sm rounded"
            onSubmit={handleSubmit((values) => OnSubmit(values))}
          >
            <h4 className="mb-4 text-center">ایجاد کار کمکی جدید</h4>
            <FormGroup className="mb-3">
              <Label for="worktitle">عنوان کار</Label>
              <Controller
                name="worktitle"
                control={control}
                render={({ field }) => (
                  <Input
                    id="worktitle"
                    className="form-control"
                    invalid={!!errors.worktitle}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.worktitle && (
                <FormFeedback>{errors.worktitle.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="workDescribe"> توضیخات کار کمکی </Label>
              <Controller
                name="workDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    id="workDescribe"
                    className="form-control"
                    invalid={!!errors.workDescribe}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.workDescribe && (
                <FormFeedback>{errors.workDescribe.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="assistanceId"> لیست دوره های کمکی</Label>
              <Controller
                name="assistanceId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="react-select"
                    theme={selectThemeColors}
                    classNamePrefix="select"
                    options={AssistanceWork}
                    isClearable
                    components={animatedComponents}
                    value={AssistanceWork.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                  />
                )}
              />
              {errors.assistanceId && (
                <FormFeedback className="d-block">
                  {errors.assistanceId.message}
                </FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/AssistanceWorkList"
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

export default CreateAssistanceWork;
