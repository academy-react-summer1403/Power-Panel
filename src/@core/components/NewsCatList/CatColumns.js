// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

// ** Third Party Components
import { Edit, Star } from "react-feather";

// ** Utils
import { DtaeConvert } from "../../../core/services/utils/date";

// ** Image Imports
import blankThumbnail from "../../../assets/images/pages/graphic-6.png";

// ** Table columns
export const CATEGORY_COLUMNS = [
  {
    name: "نام دسته بندی",
    minWidth: "180px",
    sortField: "categoryName",
    cell: (row) => (
      <>
        <img
          style={{ width: "30px", height: "30px", borderRadius: "35px" }}
          src={ blankThumbnail  ||  row.iconAddress}
          className="course-column-image"
        />
        <span className="fw-bolder category-name-truncate">
          {row.categoryName}
        </span>
      </>
    ),
  },
  {
    name: "تاریخ ایجاد",
    minWidth: "150px",
    sortField: "fullName",
    cell: (row) => {
      const formattedUpdateDate = DtaeConvert(row.insertDate);

      return (
        <div className="mr-5">
          <span className="text-sm">{formattedUpdateDate}</span>
        </div>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      return (
        <div className="column-action d-flex align-items-center gap-1">
          <Link to={`/NewsCat/edit/${row.id}`}>
            <Edit size={20} className="me-50 edit-category-icon" />
          </Link>
        </div>
      );
    },
  },
];
