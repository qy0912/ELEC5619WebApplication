import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import BaseOptionChart from '../../charts/BaseOptionChart';
import numeral from 'numeral';
import axios from 'axios';
import cookieMan from '../../../cookieManager'
import { useState, useEffect } from 'react'


// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));


const CHART_DATA = [4344, 5435, 1443, 8000,123040];

export default function AppExpensePercentage(props) {
  const theme = useTheme();
  const [chartData, setChartData] = useState([])
  const [labels, setLabels] = useState([])
  useEffect(() => {
    percentageSeasonExpense()
  },[])
  const constructPastDate = (days) => {
    var date = new Date()
    var pastDate = date.getDate() - days
    date.setDate(pastDate)
    return date
}
  const percentageSeasonExpense = () => {
    const startDate = constructPastDate(30)
    const endDate = constructPastDate(0)
    const req = {
      start: startDate,
     finish: endDate
    }

    let response = axios.post('/api/transaction/summary', req,
    {headers: {'Authorization': localStorage.getItem("token")}})
    .then(res => {
      let dataHolder = []
      let labelHolder = []
      for(let i = 0; i < res.data.categories.length; i++) {
         
        dataHolder.push( res.data.categories[i].category_sum)
        labelHolder.push(res.data.categories[i].category_name)
         
      }
      setLabels(labelHolder)
      setChartData(dataHolder)
        
    })
    .catch(err =>{
      console.log(err)
    }) 
    
}

  var chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: labels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => numeral(seriesName).format(),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Expense Percentage" data-testid={'top sales'}/>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
