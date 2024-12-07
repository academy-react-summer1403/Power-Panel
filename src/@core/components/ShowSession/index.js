import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-jalaali';
import { motion, AnimatePresence } from 'framer-motion'; 
import DataTable from 'react-data-table-component';
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  Badge
} from 'reactstrap';
import AddSession from './AddSession';
import ShowHomeWorkSession from './showHomeWorkSession';
import { DeleteTourGroup } from '../../../core/services/api/SessionApi';
import { Plus } from 'react-feather';

const ShowSession = ({ group, TourId, sessionId, isLoading }) => {
  const [show, setShow] = useState(false);  
  const noDataMessage = "هیچ جلسه‌ای وجود ندارد"; 
  const itemsPerPage = 8;

  const useDate = (date) => {
    if (!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  const sessionData = Array.isArray(sessionId) ? sessionId : (sessionId ? [sessionId] : []); 

  const columns = [
    {
      name: 'نام جلسه',
      width: '150px',
      selector: row => row.sessionTitle,
      cell: row => (
        <span className="text-truncate" style={{ maxWidth: '150px' }}>{row.sessionTitle}</span>
      )
    },
    {
      name: ' توضیحات جلسه',
      selector: row => row.sessionDescribe,
      width: '200px',
      cell: row => (
        <span className="text-truncate" style={{ maxWidth: '200px' }}>{row.sessionDescribe}</span>
      )
    },
    {
      name: 'فایل جلسه',
      width: '150px',
      selector: row => row.sessionFileDtos && row.sessionFileDtos.length > 0
        ? `${row.sessionFileDtos.length} فایل`
        : 'وجود ندارد',
    },
    {
      name: 'تاریخ انتشار جلسه',
      width: '150px',
      selector: row => useDate(row.insertDate),
    },
    {
      name: 'حالت جلسه',
      width: '150px',
      selector: row => row.forming,
      cell: row => (
        <Badge color={row.forming ? 'success' : 'danger'}>
          {row.forming ? 'تشکیل شده' : 'تشکیل نشده'}
        </Badge>
      )
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          <AddSession sessionId={sessionId?.id} row={row} title='ویرایش جلسه' />
          <ShowHomeWorkSession idSession={row.scheduleSessionId} sessionId={row.scheduleSessionId} /> 
        </div>
      )
    },
  ];

  const handleClick = () => {
    setShow(true);
  }

  return (
    <div>
      <Button size='sm' color='primary' onClick={handleClick}>
        نمایش جلسات
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader toggle={() => setShow(false)} className='bg-light'>
          گروه های این تورنومنت
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <Card className="p-3">
            <Row className='mb-3'>
              {group == null && (
                <Col>
                  <AddSession title={<Plus size={15} />} color='success' />
                </Col>
              )}
            </Row>
            <AnimatePresence>
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
              >
                {isLoading ? (
                  <div className="loading-skeleton">
                    {[...Array(10)].map((_, index) => (
                      <div key={index} className="skeleton-line" />
                    ))}
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={sessionData}
                    pagination
                    paginationPerPage={itemsPerPage}
                    paginationRowsPerPageOptions={[8, 15, 30]}
                    responsive
                    highlightOnHover
                    noDataComponent={<Badge color='warning'>{noDataMessage}</Badge>}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </ModalBody>
      </Modal>
      <style>
        {`
          .loading-skeleton {
            width: 100%;
          }
          .skeleton-line {
            height: 50px;
            background-color: #e0e0e0;
            margin: 10px 0;
            border-radius: 4px;
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0% {
              background-color: #e0e0e0;
            }
            50% {
              background-color: #ccc;
            }
            100% {
              background-color: #e0e0e0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ShowSession;
