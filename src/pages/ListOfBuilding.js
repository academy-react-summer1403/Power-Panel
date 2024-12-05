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
import { ChevronDown, CheckCircle, XCircle, Trash, Eye, Edit } from "react-feather";
import { DtaeConvert } from "../core/services/utils/date";
import axios from "axios";
import CommentDetails from "../@core/components/Comments/CommentDetails";
import { GetListOfBuildings } from "../core/services/api/BuildingApi";
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
            ساختمان های تایید شده
          </Button>
          <Button
            color={!active ? "danger" : "light"}
            onClick={() => handleToggle(false)}
            className={`me-1 ${!active ? "active-filter" : ""}`}
          >
            <XCircle size={16} className="me-1" />
            ساختمان های رد شده
          </Button>
          <Button tag={Link} to="/CreateBuilding" color="primary">
            افزودن ساختمان
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
            placeholder="جستجوی ساختمان"
          />
        </Col>
      </Row>
    </div>
  );
};

const ListOfBuilding = () => {
  const [Building, setBuilding] = useState([]);
  const [filteredBuilding, setFilteredBuilding] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const getBuilding = async () => {
      const data = await GetListOfBuildings();
      if (data) {
        setBuilding(data);
      }
    };
    getBuilding();
  }, []);

  useEffect(() => {
    const filtered = Building
      .filter((item) => item.active === active)
      .filter((item) =>
        item.buildingName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBuilding(filtered);
  }, [searchText, active, Building]);

  const handleFilter = (value) => {
    setSearchText(value);
  };

  const handleToggle = (status) => {
    setActive(status);
  };


  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.buildingName,
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "تعداد تبفه",
      selector: (row) => row.floor,
      minWidth: "150px",
    },
    {
      name: "وضعیت تایید",
      selector: (row) => (row.active ? "تایید شده" : "رد شده"),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "تاریخ",
      selector: (row) => DtaeConvert(row.workDate),
      sortable: true,
      minWidth: "150px",
    },
    {
      minWidth: "400px",
      name: "عملیات",
      cell: (row) => {

        return(
                    <div className="d-flex justify-content-start">
          {!row.active && (
            <Button
              color="success"
              size="sm"
              className="me-1"

            >
              تایید
            </Button>
          )}
          <Button
            tag={Link}
            color=""
            size="sm"
            to={`/EditBuilding/${row.id}`}
          >
            <Edit  size={16} />
          </Button>
        </div>
        )

      },
    },
  ];


  return (
    <div>
      <Card>
        <CardHeader>
          <CardText>لیست ساختمان ها</CardText>
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
              data={filteredBuilding}
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

export default ListOfBuilding;
