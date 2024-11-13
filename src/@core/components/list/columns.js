// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
} from "reactstrap";

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
import { DtaeConvert } from "../../../core/services/utils/date";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  if (row.length > 0) {
    return <Avatar className="me-50" img={row.lName} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color}
        img={row.lName}
        className="me-50"
        content={row.client ? row.client.name : "John Doe"}
        initials
      />
    );
  }
};

// ** Table columns
export const columns = [
  {
    sortable: false,
    minWidth: "30px",
    sortField: "invoiceStatus",
    name: "عکس",
    // selector: row => row.invoiceStatus,
    cell: (row) => {
      return <Avatar img={`${row.pictureAddress}`} />;
    },
  },
  {
    name: "اسم یا ایمیل",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      const name = row.client ? row.client.name : `${row.fname}`;
      const LastName = row.client ? row.client.LastName : `${row.lname}`,
        email = row.client ? row.client.companyEmail : `${row.gmail}`;
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">
              {name} {LastName}{" "}
            </h6>
            <small className="text-truncate text-muted mb-0">{email}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: "شماره تلفن",
    sortable: true,
    minWidth: "170px",
    sortField: "total",
    // selector: row => row.total,
    cell: (row) => {
      const phoneNumber = row.client
        ? row.client.phoneNumber
        : `${row.phoneNumber}`;
      return <h5> {phoneNumber} </h5>;
    },
  },
  {
    minWidth: "130px",
    name: "تاریخ تولد",
    cell: (row) => {
      const InsertDate = row.client
        ? row.client.InsertDate
        : `${row.insertDate}`;
      return <h6> {DtaeConvert(InsertDate)} </h6>;
    },
  },
  {
      name: "دانش اموز بودن",
      minWidth: "50px",
      cell: (row) => {
        const IsStudent = row.isStudent; 
        const CheckUser = () => {
          return IsStudent ? "بله" : "خیر"; 
        }
        return <Badge color={IsStudent? "success" : "danger"}> {CheckUser()} </Badge>; 
      },
    },
  {
    name: "معلم بودن",
    minWidth: "50px",
    cell: (row) => {
      const IsTeacher = `${row.isTeacher}`;
      const CheckUser = () => {
        return IsTeacher ? "بله" : "خیر"; 
      }
      return <Badge color={IsTeacher? "success" : "danger"}> {CheckUser()} </Badge>;
    },
  },
  {
    name: "درصد تکمیل پروفایل",
    minWidth: "100px",
    cell: (row) => {
      const Complet = `%${row.profileCompletionPercentage}`;
      return <h5> {Complet} </h5>;
    },
  },
  {
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Link
          to="/"
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
          }}
          title="حذف کاربر"
        >
          <Trash size={14} className="me-50" />
        </Link>
        <Link
          title="ویرایش کاربر"
          to={`/apps/invoice/edit/${row.id}`}
          className="w-100"
        >
          <Edit size={14} className="me-50" />
        </Link>
        <Link
          to={`/apps/invoice/preview/${row.id}`}
          id={`pw-tooltip-${row.id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
      </div>
    ),
  },
];
