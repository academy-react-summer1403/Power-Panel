// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardText,
  Col,
  Input,
  Row,
} from "reactstrap";

import { UpdateJob, GetAllJob, DeleteJob,  } from "../core/services/api/JobApi";

// ** Third Party Components
import { CheckCircle, ChevronDown, Edit, Trash, User, XCircle } from "react-feather";
import DataTable from "react-data-table-component";

import { DtaeConvert } from "../core/services/utils/date";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import toast from "react-hot-toast";

const CustomHeader = ({ handleFilter, handleToggle, active }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="8" className="d-flex align-items-center gap-2 px-0 px-lg-1">
          <Button tag={Link} to="/CreateJob" color="primary">
            افزودن کار
          </Button>
          <Button
            color={active ? "success" : "light"}
            onClick={() => handleToggle(true)}
            className={`me-1 ${active ? "active-filter" : ""}`}
          >
            <CheckCircle size={16} className="me-1" />
            کار های تایید شده
          </Button>
          <Button
            color={!active ? "danger" : "light"}
            onClick={() => handleToggle(false)}
            className={`me-1 ${!active ? "active-filter" : ""}`}
          >
            <XCircle size={16} className="me-1" />
            کار های رد شده
          </Button>
        </Col>
        <Col
          lg="4"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <Input
            id="search-report"
            className="ms-50 me-2 w-200"
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="جستجوی کار"
          />
        </Col>
      </Row>
    </div>
  );
};

const JobsList = () => {
  const [Job, setJob] = useState([]);
  const [filteredJob, setFilteredJob] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const getJob = async () => {
      const data = await GetAllJob();
      if (data) {
        setJob(data);
      }
    };
    getJob();
  }, []);

  useEffect(() => {
    const filtered = Job.filter((item) => item.inWork === active).filter(
      (item) => item.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJob(filtered);
  }, [searchText, active, Job]);

  const handleFilter = (value) => {
    setSearchText(value);
  };

  const handleToggle = (status) => {
    setActive(status);
  };

  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.jobTitle,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "عنوان کمپانی",
      selector: (row) => row.companyName,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "توضیحات کار",
      selector: (row) => row.aboutJob,
      minWidth: "250px",
    },
    {
      name: "وضعیت تایید",
      selector: (row) => (row.inWork ? "تایید شده" : "رد شده"),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "تاریخ شروع",
      selector: (row) => DtaeConvert(row.workStartDate),
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "تاریخ پایان",
      selector: (row) => DtaeConvert(row.workEndDate),
      sortable: true,
      minWidth: "150px",
    },
    {
      minWidth: "250px",
      name: "عملیات",
      cell: (row) => {

        const handelActiveOrDiActive = async (data) => {
            try {
                const updatedRow = { ...data, inWork: !data.inWork };
        
                const res = await UpdateJob(updatedRow);
        
                if (res.status === 200) {
                    toast.success("عملیات موفق");
        
                    setJob((prevJobs) =>
                        prevJobs.map((job) =>
                            job.id === data.id ? { ...job, inWork: !data.inWork } : job
                        )
                    );
                } else {
                    toast.error(res.ErrorMessage);
                }
        
                return res;
            } catch (error) {
                toast.error("عملیات ناموفق");
            }
        };


        const handelDelete = async (id) => {
          try {
            const res = await DeleteJob(id);
        
            if (res.status === 200) {
                toast.success("عملیات موفق");
            }

            return res
          } catch (error) {
            console.log(error)
          }
        }

        return (
          <div className="d-flex justify-content-start">
            {!row.inWork ?
              <Button onClick={() => handelActiveOrDiActive(row)} color="success" size="sm" className="me-1">
                تایید
              </Button>
            :
              <Button onClick={() => handelActiveOrDiActive(row)} color="danger" size="sm" className="me-1">
                غیر فعال کردن
              </Button>
            }
            <Button tag={Link} color="" size="sm" to={`/EditJob/${row.id}`}>
              <Edit size={16} />
            </Button>
            <Button onClick={() => handelDelete(row.id)} color="" size="sm" >
              <Trash size={16} />
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
          <CardText>لیست کار ها</CardText>
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
              data={filteredJob}
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

export default JobsList;
