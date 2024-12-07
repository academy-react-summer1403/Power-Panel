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
import { ChevronDown, CheckCircle, XCircle, Trash } from "react-feather";
import {
  GetReportComment,
} from "../core/services/api/reportCommentApi";
import { DtaeConvert } from "../core/services/utils/date";
import axios from "axios";
import CommentDetails from "../@core/components/Comments/CommentDetails";

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
            گزارش‌های تایید شده
          </Button>
          <Button
            color={!active ? "danger" : "light"}
            onClick={() => handleToggle(false)}
            className={`me-1 ${!active ? "active-filter" : ""}`}
          >
            <XCircle size={16} className="me-1" />
            گزارش‌های رد شده
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
            placeholder="جستجوی گزارش"
          />
        </Col>
      </Row>
    </div>
  );
};

const ReportComment = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const data = await GetReportComment();
      if (data) {
        setComments(data);
      }
    };
    getComments();
  }, []);

  useEffect(() => {
    const filtered = comments
      .filter((item) => item.Accept === active)
      .filter((item) =>
        item.CommentTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    setFilteredComments(filtered);
  }, [searchText, active, comments]);

  const handleFilter = (value) => {
    setSearchText(value);
  };

  const handleToggle = (status) => {
    setActive(status);
  };

  const handleAcceptReport = async (id) => {
    try {
      const updatedComment = { Accept: true };
      await axios.put(
        `https://673d05514db5a341d833bf75.mockapi.io/report/Comment-Report/${id}`,
        updatedComment
      );
      const data = await GetReportComment();
      setComments(data);
    } catch (error) {
      console.error("Error accepting report", error);
    }
  };

  const handleRejectReport = async (id) => {
    try {
      await axios.delete(
        `https://673d05514db5a341d833bf75.mockapi.io/report/Comment-Report/${id}`
      );
      const data = await GetReportComment();
      setComments(data);
    } catch (error) {
      console.error("Error rejecting report", error);
    }
  };

  const columns = [
    {
      name: "عنوان کامنت",
      selector: (row) => row.CommentTitle,
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "دلیل گزارش",
      selector: (row) => row.ReasonForReport,
      minWidth: "150px",
    },
    {
      name: "وضعیت تایید",
      selector: (row) => (row.Accept ? "تایید شده" : "رد شده"),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "تاریخ",
      selector: (row) => DtaeConvert(row.Date),
      sortable: true,
      minWidth: "150px",
    },
    {
      minWidth: "400px",
      name: "عملیات",
      cell: (row) => {
          const handleOpenCommentDetails = (comment) => {
            setSelectedComment(row);
            setOpenComment(true);
          };
        return(
                    <div className="d-flex justify-content-start">
          {!row.Accept && (
            <Button
              color="success"
              size="sm"
              className="me-1"
              onClick={() => handleAcceptReport(row.id)}
            >
              تایید
            </Button>
          )}
          <div className="d-flex justify-content-start">
            <Button
              color="primary"
              size="sm"
              onClick={() => handleOpenCommentDetails(row)} 
            >
              نمایش جزئیات
            </Button>
          </div>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleRejectReport(row.id)}
          >
            <Trash size={16} />
          </Button>
        </div>
        )

      },
      minWidth: "150px",
    },
  ];


  return (
    <div>
      <Card>
        <CardHeader>
          <CardText>لیست گزارش‌های کامنت</CardText>
        </CardHeader>
      </Card>
      <div className="invoice-list-wrapper">
        <Card>
          <div className="invoice-list-dataTable react-dataTable">
            <DataTable
              noHeader
              sortServer
              pagination
              subHeader
              columns={columns}
              responsive
              data={filteredComments}
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
      <CommentDetails
        comment={selectedComment}
        openComment={openComment}
        setOpenComment={setOpenComment}
      />
    </div>
  );
};

export default ReportComment;
