// ** Third Party Components
<<<<<<< HEAD
import classnames from "classnames";
import { UserCheck, BookOpen, Users } from "react-feather";
=======
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
>>>>>>> parent of 4c2c9324 (Add node_modules to .gitignore)

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const data = [
    {
<<<<<<< HEAD
      title: dashboardData?.allUser || 0,
      subtitle: "تعداد کاربران",
      color: "light-info",
      icon: <Users size={24} />,
=======
      title: '230k',
      subtitle: 'Sales',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
>>>>>>> parent of 4c2c9324 (Add node_modules to .gitignore)
    },
    {
      title: '8.549k',
      subtitle: 'Customers',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: '1.423k',
      subtitle: 'Products',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: '$9745',
      subtitle: 'Revenue',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
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
        <CardTitle tag='h4'>Statistics</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
