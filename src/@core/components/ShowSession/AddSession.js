 
// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; 
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-jalaali';

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Tooltip as ReactstrapTooltip
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import axios from 'axios';
import { UpdateSession } from '../../../core/services/api/SessionApi';
import { GetAdminSchedual } from '../../../core/services/api/schedualApi';

const AddSession = ({ row, title, sessionId }) => {
  // ** Validation Schema
  const [form, setForm] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAdminSchedual()
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  // Default Values from API
  const defaultValue = {
    scheduleSessionId: row?.scheduleSessionId || form,
    sessionTitle: row?.sessionTitle || '',
    sessionDescribe: row?.sessionDescribe || ''
  };

  const validationSchema = Yup.object({
    sessionTitle: Yup.string()
      .required('عنوان جلسه الزامی است')
      .min(10, 'عنوان جلسه باید حداقل 10 کاراکتر باشد')
      .max(70, 'عنوان جلسه نباید بیشتر از 100 کاراکتر باشد'),
  
    sessionDescribe: Yup.string()
      .required('توضیحات جلسه الزامی است')
      .min(10, 'توضیحات جلسه باید حداقل 10 کاراکتر باشد')
      .max(500, 'توضیحات جلسه نباید بیشتر از 500 کاراکتر باشد'),
  
    scheduleSessionId: Yup.string()
      .required('شناسه جلسه الزامی است')
      .nullable(),
  });

  const handleSubmit = async (values) => {
    try {
      await UpdateSession(values, row);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button
        size='sm'
        onClick={() => setShow(true)}
        id="editCommentButton"
      >
        {title}
      </Button>
      <ReactstrapTooltip placement='top' isOpen={tooltipOpen} target="editCommentButton" toggle={() => setTooltipOpen(!tooltipOpen)}>
        ویرایش کامنت
      </ReactstrapTooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'>بروزرسانی کامنت</h1>
            <p>اطلاعات کامنت</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='sessionTitle'>
                    عنوان جلسه <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='sessionTitle'
                    name='sessionTitle'
                    placeholder='sessionTitle'
                    value={values.sessionTitle}
                    onChange={handleChange}
                    invalid={touched.sessionTitle && !!errors.sessionTitle}
                  />
                  {touched.sessionTitle && errors.sessionTitle && <FormFeedback>{errors.sessionTitle}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='sessionDescribe'>
                    توضیحات جلسه<span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='sessionDescribe'
                    name='sessionDescribe'
                    placeholder='sessionDescribe'
                    value={values.sessionDescribe}
                    onChange={handleChange}
                    invalid={touched.sessionDescribe && !!errors.sessionDescribe}
                  />
                  {touched.sessionDescribe && errors.sessionDescribe && <FormFeedback>{errors.sessionDescribe}</FormFeedback>}
                </div>
                {row == null ? (
                  <select 
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                  >
                    {data?.map((item) => (
                      <option key={item.id} value={item.id}>{item.courseGroupId}</option>
                    ))}
                  </select>
                ) : null}
                <Button type='submit' className='me-1' style={{ position: 'absolute', bottom: '10px', right: '100px' }} color='primary'>
                  ارسال
                </Button>
                <Button type='reset' color='secondary' style={{ position: 'absolute', bottom: '10px', left: '100px' }} outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddSession;
