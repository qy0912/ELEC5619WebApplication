import React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppWeeklySales from './statistic/AppWeeklySales';
import AppSaleIncrease from './statistic/AppSaleIncrease';
import { Container } from '@mui/material';
import AppSales from './statistic/AppSales';
import AppNewCustomer from './statistic/AppNewCustomer';
import AppProductSold from './statistic/AppProductSold';
import AppSalesPercentage from './statistic/AppSalesPercentage';
import AppNewRegion from './statistic/AppNewRegion';
import axios from 'axios';
import cookieMan from '../../cookieManager'
import {Avatar} from '@mui/material'
import BarChartIcon from '@mui/icons-material//BarChart';
export default function Summary() {

    const [weeklySales, setWeeklySales] = useState(0)
    const [saleIncrease, setSaleIncrease] = useState(0)
    const [productSold, setProductSold] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [trans, setTrans] = useState([])

    useEffect(() => {
      collectWeeklySales()
      computeNewCustomers()
    }, [])

    const constructPastDate = (days) => {
        var date = new Date()
        var pastDate = date.getDate() - days
        date.setDate(pastDate)
        return date
    }

    // for weekly sales
    const collectWeeklySales = () => {
        let supplierName = cookieMan.loginUser()
        const startDate = constructPastDate(7)
        const endDate = constructPastDate(0)
        let type = cookieMan.getType()
        const req = {
          type : type,
          supplier: supplierName,
          category: 'all',
          startdate: startDate,
          enddate: endDate
        }
  
        let response = axios.post('/api/dashboard/chartInfo/getTransactionsCategory', req)
        .then(res => {
          var totalSales = 0
          var sold = 0
          setTrans(res.data.transactions)
          for(let i = 0; i < res.data.transactions.length; i++) {
            var trans = res.data.transactions[i]
            sold += trans.amount
            totalSales += trans.amount * trans.price
          }
          setProductSold(sold)
          setWeeklySales(totalSales)
          computeSaleIncrease(totalSales)
        })
        .catch(err =>{
          console.log(err)
        })
    }

    const computeSaleIncrease = (sales) => {
        let supplierName = cookieMan.loginUser()
        const startDate = constructPastDate(14)
        const endDate = constructPastDate(7)
        let type = cookieMan.getType()

        const req = {
          type:type,
          supplier: supplierName,
          category: 'all',
          startdate: startDate,
          enddate: endDate
        }
        let response = axios.post('/api/dashboard/chartInfo/getTransactionsCategory', req)
        .then(res => {
          var totalSales = 0
          for(let i = 0; i < res.data.transactions.length; i++) {
              var trans = res.data.transactions[i]
              totalSales += trans.amount * trans.price
          }
          setSaleIncrease(sales - totalSales)
        })
        .catch(err =>{  
          console.log(err)
        })
    }

    const computeNewCustomers = () => {
      let supplierName = cookieMan.loginUser()
      const startDate = constructPastDate(7)
      const endDate = constructPastDate(0)
      let type = cookieMan.getType()
      const req = {
        type:type,
        supplier: supplierName,
        startdate: startDate,
        enddate: endDate
      }
      let response = axios.post('/api/dashboard/chartInfo/getCustomerNumber', req)
      .then(res => {
        //console.log(res.data)
        setCustomers(res.data.number)
      })
      .catch(err =>{
        console.log(err)
      })
    }

    return (
      <div>
      <Container>
        <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <BarChartIcon
                    style={{
                        color: "#586A57"
                    }}
                />
        </Avatar>
        <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57', paddingBottom:'5%', textAlign:'center'}}>
                Statistical Summary
            </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg = {3}>
            <AppWeeklySales 
              saleNumber={weeklySales}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppSaleIncrease
            saleIncrease={saleIncrease}
          />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppNewCustomer  amount="22" 
            amount = {customers}
          />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppProductSold
            amountSold={productSold}
          />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <AppNewRegion/>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <AppSalesPercentage
              data={trans}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppSales/>
          </Grid>
        </Grid>
      </Container>
      </div>
    )
}