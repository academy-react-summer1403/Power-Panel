// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Core Imports
import { GetCourseById } from "../core/services/api/CourseApi";

// ** User View Components
import CourseInfoCard from "../@core/components/CourseDetails/CourseInfoCard";
import CourseTabs from "../@core/components/CourseDetails/Tabs";

// ** Styles
import "@styles/react/apps/app-users.scss";

const CourseDetails = () => {
  // ** States
  const [course, setCourse] = useState();
  const [active, setActive] = useState("1");

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Get Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const getCourse = await GetCourseById(id);

        setCourse(getCourse);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره به وجود آمد !");
      }
    };

    fetchCourse();
  }, []);

  if (!course) navigate("/courses");

  return (
    <div className="app-user-view">
      <Row>
        <Col
          xl="8"
          lg="7"
          xs={{ order: 0 }}
          md={{ order: 1, size: 7 }}
          className="course-tabs-wrapper"
        >
          <div class="course-tabs">
            <CourseTabs active={active} toggleTab={toggleTab} course={course} />
          </div>
        </Col>
        <Col xl="4" lg="5.2" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseInfoCard course={course} />
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetails;
