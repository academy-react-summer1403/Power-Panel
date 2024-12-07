// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-jalaali';
import { motion, AnimatePresence } from 'framer-motion'; 
import DataTable from 'react-data-table-component';
// ** Reactstrap Imports
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
// ** Services
import { GetHomeWork, DeleteTourGroup } from '../../../core/services/api/SessionApi';
import EditHomeWork from './AddHomeWork';
import { ThreeDots } from 'react-loader-spinner';

const ShowHomeWorkSession = ({ group, idSession, sessionId }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchHomeWork = async () => {
      if (sessionId) {
        setIsLoading(true);
        try {
          const result = await GetHomeWork(sessionId);
          setData(Array.isArray(result) ? result : (result ? [result] : []));
        } catch (error) {
          console.error("Error fetching homework:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHomeWork();
  }, [sessionId]);

  const useDate = (date) => {
    if (!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  };

  const handleDelete = async (row) => {
    try {
      await DeleteTourGroup(row.id);
      // Refresh data after deletion
      const updatedData = data.filter(item => item.id !== row.id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting tour group:", error);
    }
  };

  const columns = [
    {
      name: 'نام کار خانه',
      selector: row => row.hwTitle,
      cell: row => (
        <span title={row.hwTitle} style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.hwTitle}
        </span>
      )
    },
    {
      name: 'توضیحات کار خانه',
      selector: row => row.hwDescribe,
      cell: row => (
        <span title={row.hwDescribe} style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.hwDescribe}
        </span>
      )
    },
    {
      name: 'تاریخ کار خانه',
      selector: row => useDate(row.insertDate),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          <EditHomeWork idSession={idSession} sessionId={row} row={row} title='ویرایش کار در منزل' />
          <Button color='danger' size='sm' onClick={() => handleDelete(row)}>حذف</Button>
        </div>
      )
    },
  ];

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div>
      <Button size='sm' color='warning' className='cursor-pointer' onClick={handleClick}>نمایش کار در منزل</Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>گروه های این تورنومنت</ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='d-flex gap-3' style={{ flexFlow: 'row nowrap' }}>
            {group == null ? (
              <EditHomeWork idSession={idSession} title='افزودن کار در منزل' />
            ) : null}
          </div>
          <AnimatePresence>
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap' }}
            >
              {isLoading ? (
                <ThreeDots 
                  height="80" 
                  width="80" 
                  radius="9"
                  color="blue" 
                  ariaLabel="three-dots-loading" 
                  visible={true}
                />
              ) : (
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  highlightOnHover
                  noDataComponent={<Badge color='warning'>این جلسه هیچ کار در منزلی ندارد</Badge>}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowHomeWorkSession;
