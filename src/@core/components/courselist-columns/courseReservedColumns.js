// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ** Columns
import { COURSE_RESERVED_COMMON_COLUMNS } from "./CourseReservedCommonColumns";

// ** Core Imports
import { getCourseByIdAPI } from "../../../core/services/api/getCourseByIdAPI";

// ** Image Imports
import blankThumbnail from "../../../assets/images/icons/technology/react.png";

export const CourseReservedColumns = (isUserDetailsPage) => [
  {
    name: "نام دوره",
    reorder: true,
    width: isUserDetailsPage ? "110px" : "200px",
    cell: (row) => {
      // ** States
      const [course, setCourse] = useState();

      // ** Get Course
      useEffect(() => {
        const fetchCourse = async () => {
          try {
            const getCourse = await getCourseByIdAPI(row.courseId);

            setCourse(getCourse);
          } catch (error) {
            toast.error("مشکلی در دریافت دوره به وجود آمد !");
          }
        };

        fetchCourse();
      }, []);

      return (
        <Link
          to={`/courses/${row.courseId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              !course?.imageAddress ||
              course?.imageAddress === "undefined" ||
              course?.imageAddress === "<string>"
                ? blankThumbnail
                : course?.imageAddress
            }
            className="student-course-reserve-picture"
            style={{ width: "30px", height: "30px", borderRadius: "35px" }}
          />
          <div className="text-truncate ms-1">
            <span
              to={`/UseInfo/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.courseName}
            </span>
          </div>
        </Link>
      );
    },
  },
  !isUserDetailsPage && {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <Link to={`/UseInfo/${row.studentId}`}>
          <div className="user-info text-truncate ms-1">
            <span
              to={`/UseInfo/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.studentName}
            </span>
          </div>
        </Link>
      );
    },
  },
  ...COURSE_RESERVED_COMMON_COLUMNS("/course-reserved"),
];
