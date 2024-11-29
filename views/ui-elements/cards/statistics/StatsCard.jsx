// ** Third Party Components
import classnames from "classnames";
import { UserCheck, BookOpen, Users, User, Book, UserMinus } from "react-feather";

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols , dashboardData }) => {



  const data = [
    {
      title: dashboardData?.allUser || 0,
      subtitle: "تعداد کاربران",
      color: "light-info",
      icon: <Users size={24} />
    },
    {
      title: dashboardData?.deactiveUsers || 0,
      subtitle: "تعداد کاربران غیر فعال",
      color: "light-info",
      icon: <UserMinus size={24} />,
    },
    {
      title: dashboardData?.inCompeletUserCount || 0,
      subtitle: "کاربر تکمیل شده",
      color: "light-success",
      icon: <UserCheck size={24} />,
    },
    {
      title: dashboardData?.allReserve || 0,
      subtitle: "دوره رزرو شده",
      color: "light-danger",
      icon: <Book size={24} />,
    },
    {
      title: Math.round(dashboardData?.reserveAcceptPercent || 0) || 0,
      subtitle: "درصد رزرو های تایید شده",
      color: "light-danger",
      icon: <Book size={24} />,
    },
    {
      title: Math.round(dashboardData?.reserveNotAcceptPercent || 0) || 0,
      subtitle: "درصد رزرو های تایید نشده",
      color: "light-danger",
      icon: <Book size={24} />,
    },
    
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          style={{width: "200px"}}
          className={classnames({
            [`mb-2 m-1 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>اطلاعات</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
