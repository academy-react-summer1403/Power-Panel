import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardText,
  Col,
  Input,
  Row,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown, CheckCircle, XCircle, Edit } from "react-feather";
import { GetAllTerms } from "../core/services/api/TermApi";
import { DtaeConvert } from "../core/services/utils/date";
import { Link } from "react-router-dom";

const CustomHeader = ({ handleFilter, handleToggle, active }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <Button
            color={active ? "success" : "light"}
            onClick={() => handleToggle(true)}
            className={`me-1 ${active ? "active-filter" : ""}`}
          >
            <CheckCircle size={16} className="me-1" />
            فصل های تایید شده
          </Button>
          <Button
            color={!active ? "danger" : "light"}
            onClick={() => handleToggle(false)}
            className={`me-1 ${!active ? "active-filter" : ""}`}
          >
            <XCircle size={16} className="me-1" />
            فصل های رد شده
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <Input
            id="search-report"
            className="ms-50 me-2 w-200"
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="جستجوی فصل"
          />
        </Col>
      </Row>
    </div>
  );
};

const TermList = () => {
  const [Term, setTerm] = useState([]);
  const [filteredTerm, setFilteredTerm] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const getTerm = async () => {
      const data = await GetAllTerms();
      if (data) {
        setTerm(data);
      }
    };
    getTerm();
  }, []);

  useEffect(() => {
    const filtered = Term.filter((item) => item.expire !== active).filter(
      (item) => item.termName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTerm(filtered);
  }, [searchText, active, Term]);

  const handleFilter = (value) => {
    setSearchText(value);
  };

  const handleToggle = (status) => {
    setActive(status);
  };

  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.termName,
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "تاریخ شروع",
      selector: (row) => DtaeConvert(row.startDate),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "تاریخ پایان",
      selector: (row) => DtaeConvert(row.endDate),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "نام بخش",
      selector: (row) => row.departmentName,
      minWidth: "150px",
    },
    {
      minWidth: "400px",
      name: "عملیات",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-start">
            {row.expire && (
              <Button color="success" size="sm" className="me-1">
                تایید
              </Button>
            )}
            <Button tag={Link} color="" size="sm" to={`/EditTerm/${row.id}`}>
              <Edit size={16} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardText>لیست فصل ها</CardText>
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
              columns={columns}
              responsive
              data={filteredTerm}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              subHeaderComponent={
                <CustomHeader
                  handleFilter={handleFilter}
                  handleToggle={handleToggle}
                  active={active}
                />
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermList;
