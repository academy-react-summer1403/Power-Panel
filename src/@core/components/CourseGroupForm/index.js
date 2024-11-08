// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// ** Core Imports
import { addCourseGroupAPI } from "../../../core/services/api/CreateCourseCategoryApi";
import { updateCourseGroupAPI } from "../../../core/services/api/EditeCourseCat";
import { GetTechListAPI } from "../../../core/services/api/GetCourseTech";
import { courseGroupVal } from "../../../core/Validation/Course/CreateCat";

// ** Utils
import { convertOptions } from "../../../utility/ConvertHelper";
import { findDefaultOption } from "../../../utility/OptionHelper";
import { onFormData } from "../../../utility/DataHelper";
import { selectThemeColors } from "../../../utility/Utils";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";

const CourseCatForm = ({ group }) => {
  // ** States
  const [courses, setCourses] = useState([]);
  const [defaultCourse, setDefaultCourse] = useState();
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      groupName: "",
      groupCapacity: "",
      courseId: "",
    },
    resolver: yupResolver(courseGroupVal),
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const { groupName, groupCapacity, courseId } = values;
      const data = onFormData({
        id: group ? group.groupId : undefined,
        groupName,
        groupCapacity,
        courseId: courseId.value,
      });

      const sendCourseGroup = group
        ? await updateCourseGroupAPI(data)
        : await addCourseGroupAPI(data);

      if (sendCourseGroup.success) {
        toast.success(`گروه با موفقیت ${group ? "ویرایش" : "ایجاد"} شد !`);
        navigate("/CourseList");
      } else {
        toast.error(
          `مشکلی در ${group ? "ویرایش" : "ایجاد"} گروه به وجود آمد !`
        );
      }
    } catch (error) {
      toast.error(`مشکلی در ${group ? "ویرایش" : "ایجاد"} گروه به وجود آمد !`);
    } finally {
      setLoading(false);
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await GetTechListAPI(1, 100000);

        const convertCourses = convertOptions(getCourses.courseDtos);

        setCourses(convertCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (group) {
      if (courses.length > 0) {
        const findCourseId = findDefaultOption(courses, group.courseId);

        setValue("courseId", findCourseId);

        setDefaultCourse(findCourseId);
      }

      setValue("groupName", group.groupName);
      setValue("groupCapacity", group.groupCapacity);
    }
  }, [group, courses]);

  return (
    <div className="blog-edit-wrapper">
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardText> اضافه کردنه کتگوری </CardText>
            </CardHeader>
          </Card>
          <Card>
            <CardBody>
              <div>
                <h2 className="mb-25">{group ? "ویرایش" : "ایجاد"} گروه</h2>
              </div>
              <Form
                className="mt-2"
                onSubmit={handleSubmit((values) => onSubmit(values))}
              >
                <Row>
                <Col md="6" className="mb-3">
                <Label for="groupName">عنوان گروه</Label>
                <Controller
                  name="groupName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="groupName"
                      invalid={!!errors.groupName}
                      placeholder="عنوان گروه را وارد کنید..."
                      {...field}
                    />
                  )}
                />
                {errors.groupName && (
                  <FormFeedback>{errors.groupName.message}</FormFeedback>
                )}
              </Col>
                  <Col md="6" className="mb-3">
                <Label for="groupCapacity">ظرفیت گروه</Label>
                <Controller
                  name="groupCapacity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="groupCapacity"
                      type="number"
                      invalid={!!errors.groupCapacity}
                      placeholder="ظرفیت گروه را وارد کنید..."
                      {...field}
                    />
                  )}
                />
                {errors.groupCapacity && (
                  <FormFeedback>{errors.groupCapacity.message}</FormFeedback>
                )}
              </Col>
                  <Col md="12" className="mb-3">
                <Label for="courseId">دوره</Label>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={courses}
                      isClearable
                      components={animatedComponents}
                      {...field}
                    />
                  )}
                />
                {errors.courseId && (
                  <FormFeedback>{errors.courseId.message}</FormFeedback>
                )}
              </Col>
                  <Col md="12" className="mt-50 d-flex">
                    <Button
                      type="submit"
                      color="primary"
                      className="me-1 d-flex align-items-center submit-button"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Spinner size="sm" className="loading-spinner" />
                      )}
                      <span>{group ? "ویرایش" : "ایجاد"} گروه</span>
                    </Button>
                    <Button
                      tag={Link}
                      to="/CourseList"
                      color="secondary"
                      outline
                    >
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseCatForm;
