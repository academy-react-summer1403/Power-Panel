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
  import { CreateTechnologyApi } from "../core/services/api/TechnologyApi";
  import { Link, useNavigate } from "react-router-dom";
  import { Controller, useForm } from "react-hook-form";
  
  import { yupResolver } from "@hookform/resolvers/yup";
  import toast from "react-hot-toast";
  
  const CreateTech = () => {
  
    const Validation = yup.object().shape({
      techName: yup.string().required("این فیلد الزامی است"),
      describe: yup.string().required("این فیلد الزامی است"),
    });
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        techName: "",
        describe: "",
      },
      resolver: yupResolver(Validation),
    });
  
    const navigate = useNavigate();
  
    const OnSubmit = async (value) => {
      const formattedData = {
        techName: value.techName,
        describe: value.describe,
        iconAddress: "string",
        parentId: null
      };
  
      try {
        const res = await CreateTechnologyApi(formattedData);
        if (res.success === true) {
          navigate("/TechList");
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
              <h4 className="mb-4 text-center">ایجاد  تکنولوژی</h4>
              <FormGroup className="mb-3">
                <Label for="techName">عنوان تکنولوژی</Label>
                <Controller
                  name="techName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="techName"
                      className="form-control"
                      invalid={!!errors.techName}
                      placeholder="عنوان بخش را وارد کنید..."
                      {...field}
                    />
                  )}
                />
                {errors.techName && (
                  <FormFeedback>{errors.techName.message}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="describe">توظیحات تکنولوژی</Label>
                <Controller
                  name="describe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="describe"
                      className="form-control"
                      invalid={!!errors.describe}
                      placeholder="عنوان بخش را وارد کنید..."
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
                  to="/TechList"
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
  
  export default CreateTech;
  