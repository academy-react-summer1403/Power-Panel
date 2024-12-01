// ** React Imports
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DtaeConvert } from "../../../core/services/utils/date";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  Edit,
} from "react-feather";





// ** Table columns
export const ClassRoomColumns = [
  {
    name: "نام",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {row.classRoomName} </span>
        </div>
      );
    },
  },
  {
    name: "تاریخ ساخت",
    sortable: true,
    minWidth: "150px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {DtaeConvert(row.insertDate)} </span>
        </div>
      );
    },
  },
  {
    name: "نامه ساختمان",
    sortable: true,
    minWidth: "150px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {row.buildingName} </span>
        </div>
      );
    },
  },
  {
    name: " ظرفیت",
    sortable: true,
    minWidth: "100px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
            <span> {row.capacity} </span>
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
            to={`/EditClassRoom/${row.id}`}
            className="w-100"
          >
            <Edit size={14} className="me-50" />
          </Link>
        </div>
      );
    },
  },
];
