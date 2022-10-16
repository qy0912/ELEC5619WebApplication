import React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
 
import { Container } from '@mui/material';
import AppExpensePercentage from './statistic/AppExpensePercentage';
import AppPlanning from './statistic/AppPlanning';
import axios from 'axios';
import cookieMan from '../../cookieManager'
import {Avatar} from '@mui/material'
import BarChartIcon from '@mui/icons-material//BarChart';
import AppWeeklyExpense from './statistic/AppWeeklyExpense';
import AppMonthlyIncome from './statistic/AppMonthlyIncome';
import AppTotalExpense from './statistic/AppTotalExpense';
import AppTotalIncome from './statistic/AppTotalIncome';
import AppExpense from './statistic/AppExpense';
import { useNavigate } from 'react-router-dom';
export default function Summary() {
  const navigate = useNavigate();
    const [weeklyExpense, setWeeklyExpense] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalIncome,setTotalIncome] = useState(0)
    const [monthlyIncome,setMonthlyIncome] = useState(0)
    const [trans, setTrans] = useState([])
    useEffect(() => {
      collectWeeklyExpense()
      collectTotalExpense()
      collectTotalIncome()
      collectMonthlyIncome()
    }, [])

    const constructPastDate = (days) => {
        var date = new Date()
        var pastDate = date.getDate() - days
        date.setDate(pastDate)
        return date
    }

    // for weekly sales
    const collectWeeklyExpense = () => {
        const startDate = constructPastDate(7)
        const endDate = constructPastDate(0)
       
        const req = {
          start: startDate,
         finish: endDate
        }
  
        let response = axios.post('/api/transaction/tfilter', req,
        {headers: {'Authorization': localStorage.getItem("token")}})
        .then(res => {
          var totalExpense = 0
          var sold = 0
          setTrans(res.data)
          console.log(res.data)
          for(let i = 0; i < res.data.length; i++) {
            var trans = res.data[i]
            totalExpense += trans.totalAmount
          }
          setWeeklyExpense(totalExpense)
        })
        .catch(err =>{
          console.log(err)
        }) 
    }

    const collectMonthlyIncome= () => {
      const startDate = constructPastDate(30)
      const endDate = constructPastDate(0)
      let type = cookieMan.getType()
      const req = {
        start: startDate,
       finish: endDate
      }

      let response = axios.post('/api/income/filter', req,
      {headers: {'Authorization': localStorage.getItem("token")}})
      .then(res => {
        var totalIncome = 0
        setTrans(res.data)
        console.log(res.data)
        for(let i = 0; i < res.data.length; i++) {
          var trans = res.data[i]
          totalIncome += trans.totalAmount
        }
        setMonthlyIncome(totalIncome)
      })
      .catch(err =>{
        console.log(err)
      }) 
  }
    //
    const collectTotalExpense = () => {
      let response = axios.get('/api/transaction/',
      {headers: {'Authorization': localStorage.getItem("token")}})
      .then(res => {
        var totalExpense = 0
        setTrans(res.data)
        console.log(res.data)
        for(let i = 0; i < res.data.length; i++) {
          var trans = res.data[i]
          totalExpense += trans.totalAmount
        }
        setTotalExpense(totalExpense)
      })
      .catch(err =>{
        console.log(err)
      }) 
  }
  const collectTotalIncome = () => {
    let response = axios.get('/api/income/',
    {headers: {'Authorization': localStorage.getItem("token")}})
    .then(res => {
      var totalIncome = 0
      var sold = 0
      setTrans(res.data)
      console.log(res.data)
      for(let i = 0; i < res.data.length; i++) {
        var trans = res.data[i]
        totalIncome+= trans.totalAmount
      }
      setTotalIncome(totalIncome)
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
                Financial Summary Report
            </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg = {3}>
            <AppWeeklyExpense
              expenseNumber={weeklyExpense}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppMonthlyIncome
            income={monthlyIncome}
          />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppTotalExpense 
            amount = {totalExpense}
          />
          </Grid>
          <Grid item xs={12} sm={6} lg = {3}>
          <AppTotalIncome
            amount={totalIncome}
          />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <AppPlanning/>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <AppExpensePercentage/>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppExpense/>
          </Grid>
        </Grid>
      </Container>
      </div>
    )
}