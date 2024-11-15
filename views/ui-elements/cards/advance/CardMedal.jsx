// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'


// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import { Fragment } from 'react';

const CardMedal = ({dashboardData}) => {
  const formatCostWithUnit = (allPaymentCost) => {
    const numericCost = parseFloat(allPaymentCost);
  
    if (numericCost <= 1000000000) {
      return `${(numericCost / 1).toFixed(0)} میلیارد`; 
    }
  };
  

  return (
<Fragment>
<Card className='card-congratulations-medal'>
      <CardBody>
        <h5> مقدار کل فروش ها 🎉</h5>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            {formatCostWithUnit(dashboardData.allPaymentCost)}
          </a>
        </h3>
        <Button color='primary'> مشاهده فروش </Button>
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
</Fragment>
  )
}

export default CardMedal
