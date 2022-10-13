import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import numeral from 'numeral'
import { Box, Card, CardHeader } from '@mui/material';
import BaseOptionChart from '../../charts/BaseOptionChart';
import axios from 'axios'
import { useEffect, useState } from 'react'
import cookieMan from '../../../cookieManager'
// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [0,0,0,0,0,0,0,0,0] }];
const STATES = [
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia',
  'Australian Capital Territory',
  'Others',
]

const STATES_SHORT = [
  'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'Overseas'
]
export default function AppNewRegion() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: true },
      y: {
        formatter: (seriesName) => numeral((seriesName)).format(),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: STATES_SHORT
    }
  });

  const constructPastDate = (days) => {
    var date = new Date()
    var pastDate = date.getDate() - days
    date.setDate(pastDate)

    return date
  }

  useEffect(() => {
      let supplierName = cookieMan.loginUser()
      const startDate = constructPastDate(7)
      const endDate = constructPastDate(0)
      const req = {
         supplier: supplierName,
         state: 'all',
         startdate: startDate,
         enddate: endDate,
         type: cookieMan.getType()
      }
      let response = axios.post('/api/dashboard/chartInfo/getTransactionsState', req)
      .then(res => {
        let transactions = res.data.transactions
        for(let i = 0; i < transactions.length; i++) {
          let transaction = transactions[i]
          let sale = transaction.price * transaction.amount
          let index = STATES.indexOf(transaction.state)
          
          if(index > -1) {
            CHART_DATA[0]['data'][i] += sale
          } else {
            CHART_DATA[0]['data'][8] += sale
          }
        }
      })
      .catch(err =>{
        console.log(err)
      })
  })

  return (
    <Card>
      <CardHeader title="State Sales" subheader="Most products are sold in Northern Territory(NT)" data-testid={"state"}/>
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={370} />
      </Box>
    </Card>
  );
}
