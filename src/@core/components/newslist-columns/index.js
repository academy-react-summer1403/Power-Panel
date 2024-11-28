import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Tooltip,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
  XCircle,
} from "react-feather";
import { DtaeConvert } from "../../../core/services/utils/date";
import { numb } from "../../../core/services/utils/numbHelp";
import { onFormData } from "../../../utility/DataHelper";
import { activeNews } from "../../../core/services/api/NewsApi";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** Table columns
export const Newscolumns = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "300px",
    sortField: "250px",
    // selector: (row) => row?.title,
    cell: (row) => (
      <div>
        <span className="text-sm text-primary">{row?.title}</span>
      </div>
    ),
  },
  {
    name: "نام مدرس",
    minWidth: "150px",
    cell: (row) => {
      return <h5> {row.addUserFullName} </h5>;
    },
  },
  {
    name: "تعداد لایک ها",
    minWidth: "70px",
    cell: (row) => {
      return <span> {row?.currentLikeCount} </span>;
    },
  },
  {
    name: "تعداد دیس لایک ها",
    minWidth: "170px",
    cell: (row) => {
      return <span> {row?.currentDissLikeCount} </span>;
    },
  },
  {
    sortable: true,
    name: "تاریخ انتشار",
    sortable: true,
    minWidth: "150px",
    sortField: "StartTime",
    sortName: "StartTime",
    cell: (row) => <span>{DtaeConvert(row.insertDate)} </span>,
  },
  {
    name: "موارد دیگر",
    minWidth: "110px",
    cell: (row) => {
      // ** States
      const [activeInactiveNewsTooltip, setActiveInactiveNewsTooltip] =
        useState(false);

      const handleActiveInactiveNews = async () => {
        try {
          const data = {
            active: !row.isActive,
            id: row.id,
          };
      
          const formData = onFormData(data);
      
          const activeInactiveCourse = await activeNews(formData);
          
          console.log(activeInactiveCourse); // برای بررسی پاسخ از API
      
          if (activeInactiveCourse.success) {
            toast.success(
              `خبر با موفقیت ${row.isActive ? "غیر فعال" : "فعال"} شد !`
            );
          } else {
            toast.error(
              `مشکلی در ${
                row.isActive ? "غیر فعال" : "فعال"
              } کردن خبر به وجود آمد !`
            );
          }
        } catch (error) {
          console.error(error); 
          toast.error(
            `مشکلی در ${
              row.isActive ? "غیر فعال" : "فعال"
            } کردن خبر به وجود آمد !`
          );
        }
      };
      return (
        <div className="column-action gap-2 d-flex align-items-center">
          <div>
            {row.isActive ? (
              <XCircle
                id="activeInactiveNews"
                className="cursor-pointer activeNewsIcon"
                onClick={handleActiveInactiveNews}
              />
            ) : (
              <CheckCircle
                id="activeInactiveNews"
                className="cursor-pointer inActiveNewsIcon"
                onClick={handleActiveInactiveNews}
              />
            )}
            <Tooltip
              placement="top"
              isOpen={activeInactiveNewsTooltip}
              target="activeInactiveNews"
              toggle={() =>
                setActiveInactiveNewsTooltip(!activeInactiveNewsTooltip)
              }
              innerClassName="table-tooltip"
            >
              {row.isActive ? "غیر فعال کردن" : "فعال کردن"}
            </Tooltip>
          </div>
          <Link
                to={`/EditNews/${row.id}`}
                className="w-100"
              >
                <Edit size={22} className="me-50" />
              </Link>


        </div>
      );
    },
  },
];
