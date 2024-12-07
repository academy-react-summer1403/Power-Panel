import {CardHeader , Card , CardBody , CardText } from "reactstrap"

// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CardMedal from '../../views/ui-elements/cards/advance/CardMedal'
import StatsCard from '../../views/ui-elements/cards/statistics/StatsCard'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import InvoiceList from "../@core/components/list"
import { DashBoardAPI } from "../core/services/api/Dashboard"

const Dashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** vars
  const trackBgColor = '#e9ecef'

  const [dashboardData, setDashboardData] = useState([])

  const fetchDashboardData = async () => {
    const res = await DashBoardAPI()
    setDashboardData(res)
  }
  
  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div id='dashboard-ecommerce'>
      <Card>
              <CardHeader>
                      <CardText> خوش امدی  </CardText>
              </CardHeader>
              <CardBody>
                      <CardText> امید وارم از کاربری پنل لذت ببرید </CardText>
              </CardBody>
      </Card>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal dashboardData={dashboardData} />
        </Col>
        <Col className="justify-center " xl='8' md='6' xs='12'>
          <StatsCard dashboardData={dashboardData} cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='15' xs='14'>
               <InvoiceList/>
        </Col>
      </Row>
    </div>
)
}
export default Dashboard;
