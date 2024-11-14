// ** React Imports
import { Fragment, useEffect } from "react";

// ** Utils
import { isObjEmpty } from "@utils";
import { dateFormatter } from "../../../../utility/DateFormatter";
import { DtaeConvert } from "../../../../core/services/utils/date";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";

// ** Core Import
import { createCourseStepOneVal } from "../../../../core/Validation/Course/CreateCat";

// ** Custom Components
import FileUploaderSingle from "../../FileUploaderSingle";

const GlobalData = ({
  stepper,
  course,
  title,
  cost,
  capacity,
  sessionNumber,
  miniDescribe,
  startTime,
  endTime,
  setTitle,
  setCost,
  setCapacity,
  setSessionNumber,
  setMiniDescribe,
  setStartTime,
  setEndTime,
  files,
  setFiles,
}) => {
  const defaultValues = {
    title: "",
    cost: "",
    capacity: "",
    sessionNumber: "",
    miniDescribe: "",
    startTime: "",
    endTime: "",
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepOneVal),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const { title, cost, capacity, sessionNumber, miniDescribe, startTime, endTime } = e;
      setTitle(title);
      setCost(cost);
      setCapacity(capacity);
      setSessionNumber(sessionNumber);
      setMiniDescribe(miniDescribe);
      setStartTime(startTime);
      setEndTime(endTime);

      if (title && cost && capacity && sessionNumber && miniDescribe && startTime && endTime) {
        stepper.next();
      }
    }
  };

  useEffect(() => {
    if (course) {
      setValue("title", course.title);
      setValue("cost", course.cost);
      setValue("capacity", course.capacity);
      setValue("sessionNumber", course.sessionNumber);
      setValue("miniDescribe", course.miniDescribe);
      setValue("startTime", course.startTime);
      setValue("endTime", course.endTime);
    }
  }, [course, setValue]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات عمومی دوره</h5>
        <small className="text-muted">در این بخش باید اطلاعات دوره را وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="title">
              عنوان
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="مانند: دوره جامع react"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="cost">
              قیمت
            </Label>
            <Controller
              control={control}
              id="cost"
              name="cost"
              render={({ field }) => (
                <Input
                  id="cost"
                  placeholder="قیمت دوره"
                  invalid={errors.cost && true}
                  {...field}
                />
              )}
            />
            {errors.cost && <FormFeedback>{errors.cost.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="capacity">
              ظرفیت دوره
            </Label>
            <Controller
              id="capacity"
              name="capacity"
              control={control}
              render={({ field }) => (
                <Input
                  id="capacity"
                  placeholder="ظرفیت دوره"
                  invalid={errors.capacity && true}
                  {...field}
                />
              )}
            />
            {errors.capacity && <FormFeedback>{errors.capacity.message}</FormFeedback>}
          </Col>
          <Col md="6">
            <Label className="form-label" for="sessionNumber">
              تعداد جلسات
            </Label>
            <Controller
              control={control}
              id="sessionNumber"
              name="sessionNumber"
              render={({ field }) => (
                <Input
                  id="sessionNumber"
                  placeholder="تعداد جلسات دوره"
                  invalid={errors.sessionNumber && true}
                  {...field}
                />
              )}
            />
            {errors.sessionNumber && <FormFeedback>{errors.sessionNumber.message}</FormFeedback>}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md="6">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه
            </Label>
            <Controller
              control={control}
              id="miniDescribe"
              name="miniDescribe"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="miniDescribe"
                  placeholder="توضیح کوتاه"
                  invalid={errors.miniDescribe && true}
                  {...field}
                />
              )}
            />
            {errors.miniDescribe && <FormFeedback>{errors.miniDescribe.message}</FormFeedback>}
          </Col>
          <Col md="6" className="mt-2">
            <Label className="form-label" for="startTime">
              تاریخ شروع
            </Label>
            <Controller
              control={control}
              name="startTime"
              render={({ field }) => (
                <Input
                  type="date"
                  id="startTime"
                  placeholder="تاریخ شروع دوره"
                  value={field.value}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    field.onChange(e);
                  }}
                  invalid={errors.startTime && true}
                />
              )}
            />
            {errors.startTime && <FormFeedback>{errors.startTime.message}</FormFeedback>}
          </Col>
          <Col md="6" className="mt-2">
            <Label className="form-label" for="endTime">
              تاریخ پایان
            </Label>
            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <Input
                  type="date"
                  id="endTime"
                  placeholder="تاریخ پایان دوره"
                  value={field.value}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    field.onChange(e);
                  }}
                  invalid={errors.endTime && true}
                />
              )}
            />
            {errors.endTime && <FormFeedback>{errors.endTime.message}</FormFeedback>}
          </Col>
        </Row>
        <div className="mt-4">
          <h5>آپلود عکس دوره</h5>
          <FileUploaderSingle files={files} setFiles={setFiles} image={course?.imageAddress} />
        </div>
        <div className="d-flex justify-content-between">
          <Button type="button" color="primary" className="btn-prev" disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default GlobalData;
