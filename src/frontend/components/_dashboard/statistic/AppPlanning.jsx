import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import numeral from 'numeral'
import { Box, Card, CardHeader } from '@mui/material';
import BaseOptionChart from '../../charts/BaseOptionChart';
import axios from 'axios'
import { useEffect, useState } from 'react'
import cookieMan from '../../../cookieManager'
// ----------------------------------------------------------------------

 

 
export default function AppPlanning() {
  const CHART_DATA = [{ data: [ 0,0,0,0,0,0] }]
  const STATES = [
    'Food', 'Living', 'Transportation', 'Insurance','Housing','Others'
  ]

  const STATES_SHORT = [
    'Food', 'Living', 'Transportation', 'Insurance','Housing', 'Others'
  ]
  const [data, setData] = useState([]);
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

  

  useEffect(() => {
      const req = {
         range: "MONTHLY"
      }
      let response = axios.post('/api/transaction/planning', req,
      {headers: {'Authorization': localStorage.getItem("token")}})
      .then(res => {
        let plans= res.data.catergory_plan
        for(let i = 0; i < plans.length; i++) {
          let plan = plans[i]
          let index = STATES.indexOf(plan.catergory_name)
          if(index > -1) {
            CHART_DATA[0]['data'][index] += plan.planed_spend
          } else {
            CHART_DATA[0]['data'][5] +=  plan.planed_spend
          }
        }
        setData(CHART_DATA)
      })
      .catch(err =>{
        console.log(err)
      })
  })

  return (
    <Card>
      <CardHeader title="Budget Planning" subheader="Plan for next month's budget($)" data-testid={"state"}/>
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={data} options={chartOptions} height={370} />
      </Box>
    </Card>
  );
}
