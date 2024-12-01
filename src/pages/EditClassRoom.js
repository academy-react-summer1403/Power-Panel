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
import { CreateClassRoomApi, GetClassRoomById } from "../core/services/api/ClassRoomApi";
import { GetListOfBuildings } from "../core/services/api/BuildingApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const CreateClassRoom = () => {
  const [ClassRoom, setClassRoom] = useState([]);
  const [detail, setDetail] = useState(null);
  const param = useParams();

  const Validation = yup.object().shape({
    classRoomName: yup.string().required("این فیلد الزامی است"),
    capacity: yup.string().required("این فیلد الزامی است"),
    buildingId: yup.string().required("این فیلد الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      classRoomName: "",
      capacity: "",
      buildingId: "",
    },
    resolver: yupResolver(Validation),
  });

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const formattedData = {
      classRoomName: value.classRoomName,
      buildingId: value.buildingId,
      capacity: value.capacity
    };

    try {
      const res = await CreateClassRoomApi(formattedData);
      if (res.success === true) {
        navigate("/ClassRoomList");
      }
      else{
        toast.error(res? res.ErrorMessage : "ارور")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchGetClassRoomById = async () => {
      try {
        const res = await GetClassRoomById(param.id);
        if (res) {
          setDetail(res);
          reset({
            classRoomName: res.classRoomName,
            capacity: res.capacity,
            buildingId: res.buildingId, 
          });
        }
      } catch (error) {
        console.error("مشکلی در دریافت جزئیات فصل به وجود آمد !");
      }
    };

    const fetchDep = async () => {
      try {
        const res = await GetListOfBuildings();
        const options = res.map((item) => ({
          value: item.id,
          label: item.buildingName,
        }));
        setClassRoom(options);
      } catch (error) {
        console.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchGetClassRoomById()
    fetchDep();
  }, []);

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
            <h4 className="mb-4 text-center">ایجاد کلاس جدید</h4>
            <FormGroup className="mb-3">
              <Label for="classRoomName">عنوان بخش</Label>
              <Controller
                name="classRoomName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="classRoomName"
                    className="form-control"
                    invalid={!!errors.classRoomName}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.classRoomName && (
                <FormFeedback>{errors.classRoomName.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="capacity"> ظرفیت </Label>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <Input
                    id="capacity"
                    className="form-control"
                    invalid={!!errors.capacity}
                    placeholder="عنوان بخش را وارد کنید..."
                    {...field}
                  />
                )}
              />
              {errors.capacity && (
                <FormFeedback>{errors.capacity.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="buildingId">ساختمان ها</Label>
              <Controller
                name="buildingId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="react-select"
                    theme={selectThemeColors}
                    classNamePrefix="select"
                    options={ClassRoom}
                    isClearable
                    components={animatedComponents}
                    value={ClassRoom.find((option) => option.value === field.value)}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                  />
                )}
              />
              {errors.buildingId && (
                <FormFeedback className="d-block">
                  {errors.buildingId.message}
                </FormFeedback>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary">
                ثبت
              </Button>
              <Button
                tag={Link}
                to="/ClassRoomList"
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

export default CreateClassRoom;
