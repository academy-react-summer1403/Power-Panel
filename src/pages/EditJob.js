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
import {
  CreateJobApi,
  GetJobById,
  UpdateJob,
} from "../core/services/api/JobApi";
import { GetCourseAssistanceApi } from "../core/services/api/CourseAssistanceApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { getItem } from "../core/services/common/storage.services";

const EditJob = () => {
  const [detail, setDetail] = useState(null);
  const param = useParams();

  const Validation = yup.object().shape({
    jobTitle: yup.string().required("این فیلد الزامی است"),
    aboutJob: yup.string().required("این فیلد الزامی است"),
    companyWebSite: yup.string().required("این فیلد الزامی است"),
    companyLinkdin: yup.string().required("این فیلد الزامی است"),
    workStartDate: yup.string().required("این فیلد الزامی است"),
    workEndDate: yup.string().required("این فیلد الزامی است"),
    companyName: yup.string().required("این فیلد الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      jobTitle: "",
      aboutJob: "",
      companyWebSite: "https://",
      companyLinkdin: "https://linkedin.com",
      workStartDate: "",
      workEndDate: "",
      companyName: "",
      inWork: false,
    },
    resolver: yupResolver(Validation),
  });

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const formattedData = {
      jobTitle: value.jobTitle,
      aboutJob: value.aboutJob,
      companyWebSite: value.companyWebSite,
      companyLinkdin: value.companyLinkdin,
      workStartDate: value.workStartDate,
      workEndDate: value.workEndDate,
      companyName: value.companyName,
      inWork: value.inWork ? value.inWork.value : false,
      showInFirstPage: false,
      id: param.id,
      userId: getItem("userId")

    };

    try {
      const res = await UpdateJob(formattedData);
      if (res.success === true) {
        navigate("/JobsList");
        toast.success("عملیات با موفقیت انجام شد!");
      } else {
        toast.error(res.ErrorMessage || "ارور ناشناخته");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const res = await GetJobById(param.id);

        if (res) {
          setDetail(res);

          reset({
            jobTitle: res.jobTitle || "",
            aboutJob: res.aboutJob || "",
            companyWebSite: res.companyWebSite || "https://",
            companyLinkdin: res.companyLinkdin || "https://linkedin.com",
            workStartDate: res.workStartDate || "",
            workEndDate: res.workEndDate || "",
            companyName: res.companyName || "",
            inWork: res.inWork,
          });
        } else {
          toast.error("مشکلی در دریافت اطلاعات کار وجود دارد.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("مشکلی در دریافت اطلاعات شغل به وجود آمد!");
      }
    };

    fetchJobById();
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
            <h4 className="mb-4 text-center">ایجاد کار کمکی جدید</h4>
            <FormGroup className="mb-3">
              <Label for="jobTitle">عنوان کار</Label>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    id="jobTitle"
                    className="form-control"
                    invalid={!!errors.jobTitle}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.jobTitle && (
                <FormFeedback>{errors.jobTitle.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="aboutJob"> توضیخات کار </Label>
              <Controller
                name="aboutJob"
                control={control}
                render={({ field }) => (
                  <Input
                    id="aboutJob"
                    className="form-control"
                    invalid={!!errors.aboutJob}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.aboutJob && (
                <FormFeedback>{errors.aboutJob.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="companyWebSite">سایته کمپانی</Label>
              <Controller
                name="companyWebSite"
                control={control}
                render={({ field }) => (
                  <Input
                    dir="ltr"
                    id="companyWebSite"
                    className="form-control"
                    invalid={!!errors.companyWebSite}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.companyWebSite && (
                <FormFeedback>{errors.companyWebSite.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="companyLinkdin">ادرسه لینکد اینه کمپانی</Label>
              <Controller
                name="companyLinkdin"
                control={control}
                render={({ field }) => (
                  <Input
                    dir="ltr"
                    id="companyLinkdin"
                    className="form-control"
                    invalid={!!errors.companyLinkdin}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.companyLinkdin && (
                <FormFeedback>{errors.companyLinkdin.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mt-2">
              <Label className="form-label" for="workStartDate">
                تاریخ شروع
              </Label>
              <Controller
                control={control}
                name="workStartDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    id="workStartDate"
                    placeholder="تاریخ شروع دوره"
                    value={field.value}
                    onChange={field.onChange}
                    invalid={errors.workStartDate && true}
                  />
                )}
              />
              {errors.workStartDate && (
                <FormFeedback>{errors.workStartDate.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mt-2">
              <Label className="form-label" for="workEndDate">
                تاریخ پایان
              </Label>
              <Controller
                control={control}
                name="workEndDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    id="workEndDate"
                    placeholder="تاریخ پایان دوره"
                    value={field.value}
                    onChange={field.onChange}
                    invalid={errors.workEndDate && true}
                  />
                )}
              />
              {errors.workEndDate && (
                <FormFeedback>{errors.workEndDate.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="companyName"> نامه کمپانی</Label>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="companyName"
                    className="form-control"
                    invalid={!!errors.companyName}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.companyName && (
                <FormFeedback>{errors.companyName.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="inWork">وضعیت کار</Label>
              <Controller
                name="inWork"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: true, label: "فعال" },
                      { value: false, label: "غیرفعال" },
                    ]}
                    components={animatedComponents}
                    theme={selectThemeColors}
                    isClearable
                    placeholder="انتخاب وضعیت..."
                    className={errors.inWork ? "is-invalid" : ""}
                  />
                )}
              />
              {errors.inWork && (
                <FormFeedback>{errors.inWork.message}</FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/JobsList"
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

export default EditJob;
