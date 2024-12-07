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
  Tooltip,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
import { DebounceInput } from "react-debounce-input";
import classnames from "classnames";
import { FormSelect } from "react-bootstrap";
import { getCourseListApi } from "../core/services/api/GetListOfCourse";
import {
  GetCourseGroupAPI,
  GetCourseGroupId,
} from "../core/services/api/CourseApi";
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

const CreateSchedual = ({ schedual, title }) => {
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
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
  const [rowsPerPage, setRowsPerPage] = useState(3000);
  const [categoryIdData, setCategoryIdData] = useState([]);
  const [SelectId, setSelectId] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

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
        const response = await getCourseListApi(pageNumber, rowsPerPage);
        setCourse(response.courseFilterDtos);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (schedual) {
      const fetchCourseGroup = async () => {
        try {
          const response = await GetCourseGroupId(schedual?.courseGroupId);
          setCourseWithGroup(response.courseGroupDto);
        } catch (error) {
          console.error("Error fetching course group:", error);
        }
      };
      fetchCourseGroup();
    }
  }, [schedual]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        if (course.length) {
          course.map(async (item) => {
            const response = await GetCourseById(item.courseId);
            setCourseDetail(response);
          });
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
      }
    };
    fetchCourseDetail();
  }, [course]);

  useEffect(() => {
    if (courseDetail) {
      setTeacherId(courseDetail?.teacherId);
    }
  }, [courseDetail]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (course.length) {
          course.map(async (item) => {
            const response = await GetCourseGroupAPI(teacherId, item.courseId);
            setGroup(response);
          });
        }
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
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded px-2 py-1">
          افزودن بازه زمانی
        </div>
      )}
      <button
        onClick={() => setShow(true)}
        className="cursor-pointer px-3 py-1 border-none bg-transparent text-blue-500"
        style={{ border: "none" }}
      >
        {title}
      </button>
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
                        rowEffect: schedual ? schedual.rowEffect : "",
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
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="CourseName">نام دوره </Label>
                      <FormSelect
                        value={values.CourseName}
                        onChange={(e) =>
                          setFieldValue("CourseName", e.target.value)
                        }
                      >
                        {course?.map((item) => (
                          <option key={item?.id} value={item?.id}>
                            {item?.title}
                          </option>
                        ))}
                      </FormSelect>
                      {touched.CourseName && errors.CourseName && (
                        <div className="error">{errors.CourseName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="courseGroupId">گروه آموزشی</Label>
                      <FormSelect
                        value={values.courseGroupId}
                        onChange={(e) =>
                          setFieldValue("courseGroupId", e.target.value)
                        }
                      >
                        {group?.map((item) => (
                          <option key={item?.id} value={item?.id}>
                            {item?.courseName}
                          </option>
                        ))}
                      </FormSelect>
                      {touched.courseGroupId && errors.courseGroupId && (
                        <div className="error">{errors.courseGroupId}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="startTime">ساعت شروع</Label>
                      <Input
                        type="number"
                        name="startTime"
                        value={values.startTime}
                        onChange={(e) =>
                          setFieldValue("startTime", e.target.value)
                        }
                      />
                      {touched.startTime && errors.startTime && (
                        <div className="error">{errors.startTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="endTime">ساعت پایان</Label>
                      <Input
                        type="number"
                        name="endTime"
                        value={values.endTime}
                        onChange={(e) =>
                          setFieldValue("endTime", e.target.value)
                        }
                      />
                      {touched.endTime && errors.endTime && (
                        <div className="error">{errors.endTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="weekNumber">تعداد کلاس در هفته</Label>
                      <Input
                        type="number"
                        name="weekNumber"
                        value={values.weekNumber}
                        onChange={(e) =>
                          setFieldValue("weekNumber", e.target.value)
                        }
                      />
                      {touched.weekNumber && errors.weekNumber && (
                        <div className="error">{errors.weekNumber}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="rowEffect">تعداد کل کلاس</Label>
                      <Input
                        type="number"
                        name="rowEffect"
                        value={values.rowEffect}
                        onChange={(e) =>
                          setFieldValue("rowEffect", e.target.value)
                        }
                      />
                      {touched.rowEffect && errors.rowEffect && (
                        <div className="error">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">
                      {schedual
                        ? "ویرایش بازه زمانی"
                        : "افزودن بازه زمانی اتوماتیک"}
                    </Button>
                  </Form>
                )}
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
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
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
                        {courseWithGroup?.map((item) => (
                          <option key={item?.id} value={item?.id}>
                            {item?.courseName}
                          </option>
                        ))}
                      </FormSelect>
                      {touched.courseGroupId && errors.courseGroupId && (
                        <div className="error">{errors.courseGroupId}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="startTime">ساعت شروع</Label>
                      <Input
                        type="number"
                        name="startTime"
                        value={values.startTime}
                        onChange={(e) =>
                          setFieldValue("startTime", e.target.value)
                        }
                      />
                      {touched.startTime && errors.startTime && (
                        <div className="error">{errors.startTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="endTime">ساعت پایان</Label>
                      <Input
                        type="number"
                        name="endTime"
                        value={values.endTime}
                        onChange={(e) =>
                          setFieldValue("endTime", e.target.value)
                        }
                      />
                      {touched.endTime && errors.endTime && (
                        <div className="error">{errors.endTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="weekNumber">تعداد کلاس در هفته</Label>
                      <Input
                        type="number"
                        name="weekNumber"
                        value={values.weekNumber}
                        onChange={(e) =>
                          setFieldValue("weekNumber", e.target.value)
                        }
                      />
                      {touched.weekNumber && errors.weekNumber && (
                        <div className="error">{errors.weekNumber}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="rowEffect">تعداد کل کلاس</Label>
                      <Input
                        type="number"
                        name="rowEffect"
                        value={values.rowEffect}
                        onChange={(e) =>
                          setFieldValue("rowEffect", e.target.value)
                        }
                      />
                      {touched.rowEffect && errors.rowEffect && (
                        <div className="error">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">
                      افزودن بازه زمانی دستی
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default CreateSchedual;
