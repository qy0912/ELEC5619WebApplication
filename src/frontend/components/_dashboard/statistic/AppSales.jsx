import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useState, useEffect } from 'react'
import axios from 'axios';
import cookieMan from '../../../cookieManager'

const CHART_DATA = [
  {
    name: 'Total Sales',
    type: 'area',
    data: [150, 255, 341, 267, 122, 243, 121]
  },
  {
    name: 'Fruit',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64]
  },

  {
    name: 'Dairy',
    type: 'line',
    data: [20, 35, 42, 15, 35, 55, 10]
  },

  {
    name: 'Meat',
    type: 'line',
    data: [55, 6, 8, 7, 25, 35, 26]
  },

  {
    name: 'Vegetables',
    type: 'line',
    data: [40, 60, 80, 25, 25, 53, 35, 25, 3, 10, ]
  }
];

export default function AppSales() {

  const [chartData, setChartData] = useState([])
  
  const constructPastDate = (days) => {
    var date = new Date()
    var pastDate = date.getDate() - days
    date.setDate(pastDate)

    return date
  }
  
  const getLabels = () => {
    var dates = []
    for(let i = -1; i < 6; i ++) {
      dates.push(constructPastDate(i).toDateString())
    }
    return dates
  }

  const getDates = () => {
    var dates = []
    for(let i = 0; i < 7; i ++) {
      dates.push(constructPastDate(i))
    }
    return dates
  }
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2, 2, 2, 2] },
    fill: { type: ['gradient', 'solid', 'solid', 'solid', 'solid'] },
    labels: getLabels(),
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  useEffect(() => {
    computeWeeklySales()
  }, [])

  const computeWeeklySales = () =>{
    let supplierName = cookieMan.loginUser()
    const startDate = constructPastDate(7)
    const endDate = constructPastDate(0)

    const req = {
       supplier: supplierName,
       category: 'all',
       startdate: startDate,
       enddate: endDate,
       type: cookieMan.getType()
    }
    let response = axios.post('/api/dashboard/chartInfo/getTransactionsCategory', req)
    .then(res => {
  
              // compute total weekly sales
      var totalSales = 0
      var sold = 0

      const dates = getDates();
      // all, fruits, dairy, vegetables, meat
      const data = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]

      for(let i = 0; i < 7; i++) {
        for(let j = 0; j < res.data.transactions.length; j++) {
          var trans = res.data.transactions[j]
          var transDate = new Date(trans.createdAt)
          if(transDate.getDay() === dates[i].getDay()) {
            var sale = trans.amount * trans.price
            data[0][i] += sale
            if(trans.category === 'Fruits') {
              data[1][i] += sale
            } else if (trans.category === 'Dairy') {
              data[2][i] += sale
            } else if (trans.category === 'Vegetables') {
              data[3][i] += sale
            } else if (trans.category === 'Meat') {
              data[4][i] += sale
            }
          }
        }
      }

      computeData(data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const computeData = (e) => {
    const categories = ['All', 'Fruits', 'Dairy', 'Vegetables', 'Meat']
    const chartDataHolder = []
    const types = ['area', 'line', 'line', 'line', 'line']
    for (let i = 0; i < 5; i++) {
      chartDataHolder.push({
        name: categories[i],
        type: types[i],
        data: e[i],
      })
    }
    setChartData(chartDataHolder)
  }

  return (
    <Card>
      <CardHeader title="Sales Trend" subheader="Weekly Overview" data-testid={"sales"}/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={345} />
      </Box>
    </Card>
  );
}
