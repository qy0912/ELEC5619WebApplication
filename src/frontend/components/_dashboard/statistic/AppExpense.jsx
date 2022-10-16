import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useState, useEffect } from 'react'
import axios from 'axios';
import cookieMan from '../../../cookieManager'

export default function AppExpense() {

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
    let response = axios.get('/api/transaction/',
    {headers: {'Authorization': localStorage.getItem("token")}})
    .then(res => {

      const dates = getDates();
    
      // all, fruits, dairy, vegetables, meat
      const data = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]

      for(let i = 0; i < 7; i++) {
        for(let j = 0; j < res.data.length; j++) {
          var trans = res.data[j]
          var transDate = new Date(trans.createDate)
          
          
          if(transDate.getDay() === dates[i].getDay()) {
            
            var sale = trans.totalAmount
            data[0][i] += sale
            if(trans.category=== 'Food') {
              data[1][i] += sale
            } else if (trans.category === 'Living') {
              data[2][i] += sale
            } else if (trans.category === 'Transportation') {
              data[3][i] += sale
            } else if (trans.category === 'Insurance') {
              data[4][i] += sale
            } else if (trans.category === 'Housing') {
              data[5][i] += sale
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
    const categories = ['All', 'Food', 'Living', 'Transportation', 'Insurance','Housing']
    const chartDataHolder = []
    const types = ['area', 'line', 'line', 'line', 'line','line']
    for (let i = 0; i < 6; i++) {
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
      <CardHeader title="Expense Trend" subheader="Weekly Overview" data-testid={"sales"}/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={345} />
      </Box>
    </Card>
  );
}
