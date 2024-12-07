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
import { ChevronDown, CheckCircle, XCircle, Edit, Trash } from "react-feather";
import { DtaeConvert } from "../core/services/utils/date";
import { GetOpinion } from "../core/services/api/userOpinionApi";
import axios from "axios";

const CustomHeader = ({ handleFilter }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1"></Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <Input
            id="search-report"
            className="ms-50 me-2 w-200"
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="جستجو"
          />
        </Col>
      </Row>
    </div>
  );
};

const UserOpinion = () => {
  const [UserOpinion, setUserOpinion] = useState([]);
  const [filteredUserOpinion, setFilteredUserOpinion] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const GetUserOpinion = async () => {
      const data = await GetOpinion();
      if (data) {
        setUserOpinion(data);
        setFilteredUserOpinion(data);
      }
    };
    GetUserOpinion();
  }, []);

  useEffect(() => {
    const filtered = UserOpinion.filter(
      (item) => item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUserOpinion(filtered);
  }, [searchText, UserOpinion]);

  const handleFilter = (value) => {
    setSearchText(value);
  };

  const handleDelete = async (id) => {
    try {
    await axios.delete(
        `https://66103a720640280f219ca24e.mockapi.io/card/Produc/${id}`
      );
      const data = await GetOpinion();
      setComments(data);
    } catch (error) {
      console.error("Error rejecting report", error);
    }
  };

  const columns = [
    {
      name: "عنوان ",
      selector: (row) => row.title,
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "دلیل",
      selector: (row) => row.description,
      minWidth: "150px",
    },
    {
      name: "تاریخ",
      selector: (row) => DtaeConvert(row.Data),
      sortable: true,
      minWidth: "150px",
    },
    {
        minWidth: "400px",
        name: "عملیات",
        cell: (row) => {
          return (
            <div className="d-flex justify-content-start">
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDelete(row.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          );
        },
        minWidth: "150px",
      }
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
              data={filteredUserOpinion}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              subHeaderComponent={
                <CustomHeader
                  handleFilter={handleFilter}
                />
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserOpinion;
