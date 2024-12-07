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
import { EditTermApi, GetTermById } from "../core/services/api/TermApi";
import { GetDepartmentApi } from "../core/services/api/DepartmentApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateTerm = () => {
  const [Term, setTerm] = useState([]);
  const [detail, setDetail] = useState(null);
  const param = useParams();

  const Validation = yup.object().shape({
    termName: yup.string().required("این فیلد الزامی است"),
    departmentId: yup.string().required("این فیلد الزامی است"),
    startDate: yup
      .date()
      .required("این فیلد الزامی است")
      .typeError("فرمت تاریخ معتبر نیست"),
    endDate: yup
      .date()
      .required("این فیلد الزامی است")
      .typeError("فرمت تاریخ معتبر نیست"),
  });

  
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      termName: "",
      departmentId: "",
      startDate: "",
      endDate: "",
    },
    resolver: yupResolver(Validation),
  });


  const OnSubmit = async (value) => {
    const formattedData = {
      termName: value.termName,
      startDate: new Date(value.startDate).toISOString().split("T")[0],
      endDate: new Date(value.endDate).toISOString().split("T")[0],
      departmentId: value.departmentId,
    };

    try {
      const res = await EditTermApi(formattedData);
      if (res.success === true) {
        navigate("/TermList");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
      const fetchTermById = async () => {
        try {
          const res = await GetTermById(param.id);
          if (res) {
            setDetail(res);
            reset({
              termName: res.termName,
              departmentId: res.departmentId, 
              startDate: res.startDate,
              endDate: res.endDate,
            });
          }
        } catch (error) {
          console.error("مشکلی در دریافت جزئیات فصل به وجود آمد !");
        }
      };

    const fetchDep = async () => {
      try {
        const res = await GetDepartmentApi();
        const options = res.map((item) => ({
          value: item.id,
          label: item.depName,
        }));
        setTerm(options);
      } catch (error) {
        console.error("مشکلی در دریافت دوره‌ها به وجود آمد !");
      }
    };
  
    fetchTermById();
    fetchDep();
  }, [param.id, reset]);

  if (!detail) {
    return <div>در حال بارگذاری...</div>; 
  }

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form
            className="border p-4 shadow-sm rounded"
            onSubmit={handleSubmit((values) => OnSubmit(values))}
          >
            <h4 className="mb-4 text-center">ادیت فصل جدید</h4>
            <FormGroup className="mb-3">
              <Label for="termName">عنوان فصل</Label>
              <Controller
                name="termName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="termName"
                    className="form-control"
                    invalid={!!errors.termName}
                    placeholder="عنوان فصل را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.termName && (
                <FormFeedback>{errors.termName.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="startDate">تاریخ شروع</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    id="startDate"
                    className="form-control"
                    invalid={!!errors.startDate}
                    {...field}
                  />
                )}
              />
              {errors.startDate && (
                <FormFeedback>{errors.startDate.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="endDate">تاریخ پایان</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    id="endDate"
                    className="form-control"
                    invalid={!!errors.endDate}
                    {...field}
                  />
                )}
              />
              {errors.endDate && (
                <FormFeedback>{errors.endDate.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="departmentId">دوره</Label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="react-select"
                    theme={selectThemeColors}
                    classNamePrefix="select"
                    options={Term}
                    isClearable
                    components={animatedComponents}
                    value={Term.find((option) => option.value === field.value)}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                  />
                )}
              />
              {errors.departmentId && (
                <FormFeedback className="d-block">
                  {errors.departmentId.message}
                </FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/TermList"
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

export default CreateTerm;
