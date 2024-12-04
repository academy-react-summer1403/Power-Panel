// ** React Imports
import { Link } from "react-router-dom";

// ** Utils
import { DtaeConvert } from "../../../core/services/utils/date";

// ** Image Imports
import blankThumbnail from "../../../assets/images/avatars/avatar-blank.png";

export const USER_FAVORITE_COURSES_COLUMNS = [
  {
    name: "نام دوره",
    reorder: true,
    width: "200px",
    cell: (row) => {
      return (
        <div
          className="d-flex align-items-center"
        >
          <img
            src={
              !row?.tumbImageAddress ||
              row?.tumbImageAddress === "undefined" ||
              row?.tumbImageAddress === "<string>"
                ? blankThumbnail
                : row?.tumbImageAddress
            }
            className="student-course-reserve-picture"
            style={{ width: "30px", height: "30px", borderRadius: "35px" }}
          />
          <div className="text-truncate ms-1">
            <span
              to={`/courses/${row.courseId}`}
              className="course-reserve-student-name"
            >
              {row.title}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    name: "آخرین بروزرسانی",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      const formattedLastUpdate = DtaeConvert(row.lastUpdate);

      return (
        <div>
          <div className="user-info text-truncate ms-1">
            <span className="course-reserve-student-name">
              {formattedLastUpdate}
            </span>
          </div>
        </div>
      );
    },
  },
];
