// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card, CardHeader, CardText } from "reactstrap";

// ** Core Imports
import { GetCourseCategory } from "../core/services/api/CourseGroup";

// ** Custom Components
import CourseGroupsTable from "../@core/components/CourseGroups/CourseGroupsTable"

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseList = () => {
  // ** States
  const [courseGroups, setCourseGroups] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const fetchCourseGroups = async () => {
      try {
        const getCourseGroups = await getCourseGroupsAPI(
          currentPage,
          rowsPerPage
        );

        setCourseGroups(getCourseGroups);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه های دوره به وجود آمد !");
      }
    };

    fetchCourseGroups();
  }, []);

  useEffect(() => {
    const fetchCourseGroups = async () => {
      try {
        const getCourseGroups = await GetCourseCategory(
          currentPage,
          rowsPerPage,
          sortColumn,
          sort,
          searchText
        );

        setCourseGroups(getCourseGroups);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه های دوره به وجود آمد !");
      }
    };

    fetchCourseGroups();
  }, [searchText, sort, sortColumn, currentPage, rowsPerPage]);

  return (
    <div className="invoice-list-wrapper">
     <Card>
        <CardHeader>
                    <CardText> لیست کتگوری ها </CardText>
        </CardHeader>
     </Card>
      <Card className="rounded">
        <CourseGroupsTable
          courseGroups={courseGroups}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          searchText={searchText}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchText={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
        />
      </Card>
    </div>
  );
};

export default CourseList;
