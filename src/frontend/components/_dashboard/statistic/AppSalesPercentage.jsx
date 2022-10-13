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


const CHART_DATA = [4344, 5435, 1443, 8000];

export default function AppSalesPercentage(props) {
  const {data} = props
  const theme = useTheme();

  const [chartData, setChartData] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    var dist = {}
    var total = 0
    var keys = []
    if(data === undefined) {
      return
    }
    for(let i = 0; i < data.length; i++) {
      if(dist[data[i].productname] === undefined) {
        dist[data[i].productname] = data[i].price * data[i].amount
      } else {
        dist[data[i].productname] += data[i].price * data[i].amount
      }
      total += data[i].price * data[i].amount
    }

    for(const [key, value] of Object.entries(dist)) {
      keys.push(key)
    }
    keys.sort((e1, e2) => {
      if(dist[e1] > dist[e2]) {
        return -1
      } else if(dist[e1] < dist[e2]) {
        return 1
      } else {
        return 0
      }
    })

    const dataHolder = []
    let others = total

    
    var labelHolder = []
    let amount = Math.min(3, keys.length)
    for(let i = 0; i < amount; i++) {
      dataHolder.push(dist[keys[i]])
      others -= dist[keys[i]]
      labelHolder.push(keys[i])
    }

    if(others !== 0) {
      labelHolder.push('Others')
      dataHolder.push(others)
    }
    setLabels(labelHolder)
    setChartData(dataHolder)  
  },[data])

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
      <CardHeader title="Top Sales" data-testid={'top sales'}/>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
