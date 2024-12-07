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

import * as yup from "yup";
import makeAnimated from "react-select/animated";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { CreateStatusApi } from "../core/services/api/StatusApi";

const CreateStatus = () => {

  const Validation = yup.object().shape({
    statusName: yup.string().required("این فیلد الزامی است"),
    describe: yup.string().required("این فیلد الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      statusName: "",
      describe: "",
    },
    resolver: yupResolver(Validation),
  });

  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const randomStatusNumber = Math.floor(10 + Math.random() * 90);

    const formattedData = {
      statusName: value.statusName,
      describe: value.describe,
      statusNumber: randomStatusNumber,
    };

    try {
      const res = await CreateStatusApi(formattedData);
      if (res.success === true) {
        navigate("/StatusList");
      }
      else{
        toast.error(res? res.ErrorMessage : "ارور")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form
            className="border p-4 shadow-sm rounded"
            onSubmit={handleSubmit((values) => OnSubmit(values))}
          >
            <h4 className="mb-4 text-center">ایجاد وعضیت جدید</h4>
            <FormGroup className="mb-3">
              <Label for="statusName">عنوان وعضیت</Label>
              <Controller
                name="statusName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="statusName"
                    className="form-control"
                    invalid={!!errors.statusName}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.statusName && (
                <FormFeedback>{errors.statusName.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
            <Label for="describe">توضیحات وعضیت</Label>
              <Controller
                name="describe"
                control={control}
                render={({ field }) => (
                  <Input
                    id="describe"
                    className="form-control"
                    invalid={!!errors.describe}
                    placeholder="توضیحات وعضیت را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.describe && (
                <FormFeedback>{errors.describe.message}</FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/StatusList"
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

export default CreateStatus;
