import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  Tooltip
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
import { DebounceInput } from "react-debounce-input";
import classnames from "classnames";
import { FormSelect } from "react-bootstrap";
import { getCourseListApi } from "../core/services/api/GetListOfCourse";
import { getCourseGroupAPI } from "../core/services/api/CourseApi";
import { GetCourseById } from "../core/services/api/CourseApi";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
    AddSchedualAtomatic,
    AddSchedualSingle,
    UpdateSchedual,
} from "../core/services/api/schedualApi";
import { getCourseGroupId } from "../core/services/api/CourseApi";

const CreateSchedual = ({ schedual, title }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [queryValue, setQueryValue] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [groupIdSchedual, setGroupIdSchedual] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [formingSwitch, setformingSwitch] = useState(true);
  const [locktoRiseSwitch, setLocktoRiseSwitch] = useState(true);
  const [course, setCourse] = useState([]);
  const [courseWithGroup, setCourseWithGroup] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [group, setGroup] = useState([]);
  const [categoryIdData, setCategoryIdData] = useState([]);
  const [SelectId, setSelectId] = useState(1);

  const validationSchema1 = Yup.object({
    courseGroupId: Yup.string().required("گروه دوره الزامی است"),
    startTime: Yup.number()
      .required("ساعت شروع الزامی است")
      .min(1, "حداقل کاراکتر 1 است"),
    endTime: Yup.number()
      .required("ساعت پایان الزامی است")
      .max(24, "حداقل کاراکتر 24 است"),
    weekNumber: Yup.number().required("تعداد کلاس در هفته الزامی است"),
    rowEffect: Yup.number().required("تعداد کل کلاس الزامی است"),
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseListApi(queryValue);
        setCourse(response.courseDtos || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [queryValue]);

  useEffect(() => {
    if (schedual) {
      const fetchCourseGroup = async () => {
        try {
          const response = await getCourseGroupId(schedual?.courseGroupId);
          setCourseWithGroup(response);
        } catch (error) {
          console.error("Error fetching course group:", error);
        }
      };
      fetchCourseGroup();
    }
  }, [schedual]);

  useEffect(() => {
    if (courseWithGroup) {
      const fetchCourseDetail = async () => {
        try {
          const response = await GetCourseById(
            courseWithGroup?.courseGroupDto?.courseId
          );
          setCourseDetail(response);
        } catch (error) {
          console.error("Error fetching course detail:", error);
        }
      };
      fetchCourseDetail();
    }
  }, [courseWithGroup]);

  useEffect(() => {
    if (courseDetail) {
      setTeacherId(courseDetail?.teacherId);
    }
  }, [courseDetail]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await getCourseGroupAPI(
          teacherId,
          courseWithGroup?.courseGroupDto?.courseId
        );
        setGroup(response || []);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    if (teacherId && courseWithGroup) {
      fetchGroup();
    }
  }, [teacherId, courseWithGroup]);

  const handleSearch = (e) => setQueryValue(e.target.value);

  const handleSubmit1 = async (values) => {
    setShow(false);
    try {
      if (schedual) {
        await UpdateSchedual(values, courseDetail?.courseId);
      } else {
        await AddSchedualAtomatic(values, selectedId);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit2 = async (values) => {
    setShow(false);
    try {
      await AddSchedualSingle(values, selectedId);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Tooltip placement="top" title="افزودن بازه زمانی">
        <Button
          onClick={() => setShow(true)}
          size="sm"
          color="transparent"
          className=" cursor-pointer"
          style={{ border: "none" }}
        >
          {title}
        </Button>
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
        backdrop="static"
        keyboard={false}
        style={{ width: "500px" }}
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(false)}>
          مدیریت دسته بندی
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => setActiveTab("1")}
                style={{ flex: activeTab === "1" ? "2" : "1" }}
              >
                {schedual
                  ? "ویرایش بازه زمانی "
                  : "افزودن  بازه زمانی اتوماتیک"}
              </NavLink>
            </NavItem>
            {schedual == null ? (
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => setActiveTab("2")}
                  style={{ flex: activeTab === "2" ? "2" : "1" }}
                >
                  افزودن بازه زمانی دستی
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Formik
                initialValues={
                  schedual
                    ? {
                        courseGroupId: Number(groupIdSchedual) || "",
                        startDate: schedual ? schedual.startDate : "",
                        startTime: schedual ? schedual.startTime : "",
                        endTime: schedual ? schedual.endTime : "",
                        weekNumber: schedual ? schedual.weekNumber : "",
                        rowEffect: schedual ? schedual.startDate : "",
                        forming: schedual ? schedual.forming : true,
                        locktoRise: schedual ? schedual.locktoRise : true,
                      }
                    : {
                        courseGroupId: Number(groupIdSchedual) || "",
                        startDate: "",
                        startTime: "",
                        endTime: "",
                        weekNumber: "",
                        rowEffect: "",
                      }
                }
                validationSchema={validationSchema1}
                onSubmit={handleSubmit1}
                enableReinitialize={true}
              >
                {(formikProps) => {
                  const {
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                  } = formikProps;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <DebounceInput
                          debounceTimeout={700}
                          value={queryValue}
                          onChange={handleSearch}
                          placeholder="نام دوره ..."
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                            transition:
                              "border-color 0.3s ease, box-shadow 0.3s ease",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#007bff")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#ced4da")
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="courseGroupId">گروه آموزشی</Label>
                        <FormSelect
                          value={values.courseGroupId}
                          onChange={(e) =>
                            setFieldValue("courseGroupId", e.target.value)
                          }
                        >
                          {course?.map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.courseName}
                            </option>
                          ))}
                        </FormSelect>
                        {touched.courseGroupId && errors.courseGroupId && (
                          <div className="error">{errors.courseGroupId}</div>
                        )}
                      </FormGroup>
                      {/* Add other form fields like start time, end time, etc. */}
                      <Button color="primary" type="submit">
                        {schedual
                          ? "ویرایش بازه زمانی"
                          : "افزودن بازه زمانی اتوماتیک"}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </TabPane>
            <TabPane tabId="2">
              <Formik
                initialValues={{
                  courseGroupId: Number(groupIdSchedual) || "",
                  startDate: "",
                  startTime: "",
                  endTime: "",
                  weekNumber: "",
                  rowEffect: "",
                }}
                validationSchema={validationSchema1}
                onSubmit={handleSubmit2}
                enableReinitialize={true}
              >
                {(formikProps) => {
                  const {
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                  } = formikProps;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <DebounceInput
                          debounceTimeout={700}
                          value={queryValue}
                          onChange={handleSearch}
                          placeholder="نام دوره ..."
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                            transition:
                              "border-color 0.3s ease, box-shadow 0.3s ease",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#007bff")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#ced4da")
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="courseGroupId">گروه آموزشی</Label>
                        <FormSelect
                          value={values.courseGroupId}
                          onChange={(e) =>
                            setFieldValue("courseGroupId", e.target.value)
                          }
                        >
                          {course?.map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.courseName}
                            </option>
                          ))}
                        </FormSelect>
                        {touched.courseGroupId && errors.courseGroupId && (
                          <div className="error">{errors.courseGroupId}</div>
                        )}
                      </FormGroup>
                      {/* Add other form fields like start time, end time, etc. */}
                      <Button color="primary" type="submit">
                        افزودن بازه زمانی دستی
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default CreateSchedual;
