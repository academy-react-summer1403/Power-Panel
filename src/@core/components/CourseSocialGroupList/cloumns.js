// ** React Imports
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DtaeConvert } from "../../../core/services/utils/date";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  Trash,
  PieChart,
  CheckCircle,
  ArrowDownCircle,
} from "react-feather";




// ** Table columns
export const CourseSocialGroupColumns = [
  {
    name: "نام",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {row.groupName} </span>
        </div>
      );
    },
  },
  {
    name: "لینکه گروه",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {row.groupLink} </span>
        </div>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => {


      return (
        <div className="column-action d-flex align-items-center">
          <Link
            title="ویرایش کاربر"
            to={`/EditCourseSocialGroup/${row.id}`}
            className="w-100"
          >
            <Edit size={14} className="me-50" />
          </Link>
        </div>
      );
    },
  },
];
