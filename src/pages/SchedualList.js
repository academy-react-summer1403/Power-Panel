// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DtaeConvert } from "../core/services/utils/date";


// Toast Import
import toast from "react-hot-toast";


import Swal from "sweetalert2";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown, Edit, Plus, User } from "react-feather";
import DataTable from "react-data-table-component";

import { useTimeOut } from "../utility/hooks/useTimeOut";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { GetAdminSchedual } from "../core/services/api/schedualApi";
import CreateSchedual from "./CreateSchedual";








const Schedual = () => {
  const CustomHeader = ({ handlePerPage }) => {
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
            <CreateSchedual title={"افزودن بازه رمانی"} />
            
          </Col>
          <Col
            lg="6"
            className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
          >
            <div className="d-flex align-items-center">
            <Input 
              type='date'
              name='startTime'
              style={{width:'40%'}}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
          />
          <Input 
              type='date'
              name='endTime'
              style={{width:'40%'}}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
          />
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  // ** States
  const [Schedual, setSchedual] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState("desc");
  const [startTime, setStartTime] = useState('1900/01/10')
  const [endTime, setEndTime] = useState('3000/01/10')
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const textTimeOut = useTimeOut();

  useEffect(() => {
        const fetch = async () => {
            try {
                const res = await GetAdminSchedual(startTime, endTime)
                setSchedual(res)
                setFilteredData(res); 
            } catch (error) {
                toast.error("Error")                
            }
        }
        fetch()
  }, []);



  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);

    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column.sortField] > b[column.sortField] ? 1 : -1;
      } else {
        return a[column.sortField] < b[column.sortField] ? 1 : -1;
      }
    });

    setFilteredData(sortedData);
  };

  const dataToRender = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / rowsPerPage);

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

  



  // ** Table columns
   const Columns = [
      {
        name: 'تعداد در هفته ',
        selector: row => row.weekNumber,
        sortable: true,
      },
      {
        name: 'روز دوره',
        selector: row => DtaeConvert(row.startDate),
        sortable: true,
      },
      {
        name: 'پایان دوره',
        selector: row => DtaeConvert(row.endDate),
        sortable: true,
      },
      {
        name: 'حالت دوره',
        selector: row => row.forming? "تشکیل شده" :" تشکیل نشده",
        sortable: true,
      },   
      {
        name: 'حضور غیاب دانشجو',
        selector: row => row.lockToRaise?" نمیتوانند شرکت کنند" :" میتوانند شرکت کنند",
        sortable: true,
      }, 
      {
        name: "عملیات",
        minWidth: "160px",
        cell: (row) => {
          return (
            <div className="column-action d-flex align-items-center gap-1">
              <CreateSchedual schedual={Schedual} title={<Edit size={14} className="me-50" />}  />
                
            </div>
          );
        },
      },
  ];

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={Columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="id"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};


export default Schedual;
