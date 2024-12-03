// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Import
import { Badge, Tooltip } from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";

// ** Core Imports
import { getCourseGroupAPI } from "../../../core/services/api/CourseApi";
import { DeleteCourseReserveAPI } from "../../../core/services/api/CourseApi";
import { SendReserveToCourseAPI } from "../../../core/services/api/CourseApi";
import { getCourseByIdAPI } from "../../../core/services/api/getCourseByIdAPI";

// ** Utils Imports
import { DtaeConvert } from "../../../core/services/utils/date";

export const COURSE_RESERVED_COMMON_COLUMNS = (redirectUrl) => [
  {
    name: "زمان رزرو",
    reorder: true,
    minWidth: "170px",
    cell: (row) => <span>{DtaeConvert(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    reorder: true,
    minWidth: "200px",
    cell: (row) => (
      <Badge color={row.accept ? "light-success" : "light-danger"}>
        {row.accept ? "تایید شده" : "تایید نشده"}
      </Badge>
    ),
  },
  {
    name: "تایید رزرو",
    reorder: true,
    minWidth: "100px",
    cell: (row) => {
      // ** State
      const [addReserveToCourse, setAddReserveToCourse] = useState(false);
      const [deleteCourseReserve, setDeleteCourseReserve] = useState(false);


      // ** Function for handle change course reserve to student course
      const handleChangeCourseReserveToStudentCourse = async () => {
        try {
          const getCourseDetail = await getCourseByIdAPI(row.courseId);
          const getCourseGroup = await getCourseGroupAPI(
            getCourseDetail.teacherId,
            row.courseId
          );
          const sendReserveToCourse = await SendReserveToCourseAPI(
            row.courseId,
            getCourseGroup[0].groupId,
            row.studentId
          );

          if (sendReserveToCourse.success) {
            toast.success("رزرو با موفقیت تایید شد !");
          } else {
            toast.error(sendReserveToCourse.ErrorMessage);
          }
        } catch (error) {
          toast.error("مشکلی در تایید رزرو دوره به وجود آمد !");
        }
      };

      // ** Function for handle delete course reserve
      const handleDeleteCourseReserve = async () => {
        try {
          const deleteCourseReserve = await DeleteCourseReserveAPI(
            row.reserveId
          );

          if (deleteCourseReserve.success) {
            toast.success("رزرو با موفقیت حذف شد !");
          } else {
            toast.error("مشکلی در حذف دوره به وجود آمد !");
            toast.error(DeleteCourseReserveAPI.message);
          }
        } catch (error) {
          toast.error("مشکلی در حذف رزرو به وجود آمد !");
        }
      };

      return (
        !row.accept && (
          <div>
            <div className="d-flex gap-2">
              <div>
                <Check
                  className="cursor-pointer"
                  id="ChangeCourseReserveToStudentCourse"
                  onClick={handleChangeCourseReserveToStudentCourse}
                />
                <Tooltip
                  placement="top"
                  isOpen={addReserveToCourse}
                  target="ChangeCourseReserveToStudentCourse"
                  toggle={() => setAddReserveToCourse(!addReserveToCourse)}
                  innerClassName="table-tooltip"
                >
                  پذیرفتن رزرو
                </Tooltip>
              </div>
              <div>
                <X
                  className="cursor-pointer"
                  id="DeleteCourseReserve"
                  onClick={handleDeleteCourseReserve}
                />
                <Tooltip
                  placement="top"
                  isOpen={deleteCourseReserve}
                  target="DeleteCourseReserve"
                  toggle={() => setDeleteCourseReserve(!deleteCourseReserve)}
                  innerClassName="table-tooltip"
                >
                  رد کردن رزرو
                </Tooltip>
              </div>
            </div>
          </div>
        )
      );
    },
  },
];
