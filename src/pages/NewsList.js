// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";

// ** Table Columns
import { Newscolumns } from "../@core/components/newslist-columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { CheckCircle, ChevronDown, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// Hooks import
import { useTimeOut } from "../utility/hooks/useTimeOut";

// ** Reactstrap Imports
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardText,
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { GetListOfNews } from "../core/services/api/NewsApi";

const CustomHeader = ({
  handleFilter,
  handlePerPage,
  active,
  setActive,
  activeNewsCount,
  deletedNewsCount,
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              type="select"
              id="rows-per-page"
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Input>
          </div>
          <Button tag={Link} to="/CreateNews" color="primary">
            افزودن خبر
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center me-3">
            <Button
              color={active ? "success" : "light"}
              onClick={() => setActive(true)}
              style={{ width: "180px"}}
              className={`me-1 ${active ? "active-filter" : ""}`}
            >
              <CheckCircle size={16} className="me-1" />
              اخبار فعال ({activeNewsCount || 0})
            </Button>
            <Button
              color={!active ? "danger" : "light"}
              onClick={() => setActive(false)}
              style={{ width: "180px"}}
              className={`me-1 ${!active ? "active-filter" : ""}`}
            >
              <Trash2 size={16} className="me-1" />
              اخبار غیرفعال ({deletedNewsCount || 0})
            </Button>
          </div>
          <Input
            id="search-invoice"
            className="ms-50 me-2 w-200"
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="جستجوی خبرها"
          />
        </Col>
      </Row>
    </div>
  );
};

const NewsList = () => {
  // ** States
  const [News, setNews] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState();
  const [active, setActive] = useState(true);
  const [activeNewsCount, setActiveNewsCount] = useState(0);
  const [deletedNewsCount, setDeletedNewsCount] = useState(0);

  const textTimeOut = useTimeOut();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const getData = await GetListOfNews(currentPage, rowsPerPage);

        setNews(getData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const getData = await GetListOfNews(
          currentPage,
          rowsPerPage,
          sortColumn,
          sort,
          searchText,
          active
        );

        setNews(getData);

        if (active) setActiveNewsCount(getData.totalCount);
        else setDeletedNewsCount(getData.totalCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, [searchText, sort, currentPage, rowsPerPage, active]);

  const handleFilter = (val) => {
    textTimeOut(() => {
      setSearchText(val);
    }, 800);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((News.totalCount / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    if (News?.news?.length > 0) {
      return News.news;
    } else if (News?.totalCount === 0) {
      return [];
    } else {
      return News?.news?.slice(0, rowsPerPage);
    }
  };
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardText>لیست مدیریت خبرات</CardText>
        </CardHeader>
      </Card>
      <div className="invoice-list-wrapper">
        <Card>
          <div className="invoice-list-dataTable react-dataTable">
            <DataTable
              noHeader
              pagination
              sortServer
              paginationServer
              subHeader={true}
              columns={Newscolumns}
              responsive={true}
              onSort={handleSort}
              data={dataToRender()}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              defaultSortField="invoiceId"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  active={active}
                  setActive={setActive}
                  activeNewsCount={activeNewsCount}
                  deletedNewsCount={deletedNewsCount}
                />
              }
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default NewsList;
