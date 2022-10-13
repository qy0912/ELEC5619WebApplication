 
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import cookieMan from '../cookieManager';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Container } from '@mui/material';
import {makeStyles} from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from "../components/Footer";
import { Navigate } from 'react-router';
import TablePagination from '@mui/material/TablePagination';
  function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const [click, setClick] = React.useState(row.status==='Shipped');
   
   
   
  const handleComplete = ()=>{
    console.log(row._id);
    axios.post('/api/order/complete',{_id:row._id});
    setStatus('Shipped')
     
    setClick(true)

  
     

  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="center">{row.createdAt.slice(0,10)}</TableCell>
        <TableCell align="center">{row.address.address}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{row.total}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleComplete}  >

            {click ? <CheckCircleOutlineIcon color="success" /> : <CheckCircleOutlineIcon color="warning" />}  
           
            
              
            </IconButton>
        </TableCell>
      
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 10, paddingTop: 10}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((historyRow) => (
                    <TableRow key={historyRow.productname}>
                      <TableCell component="th" scope="row">
                        {historyRow.productname}
                      </TableCell>
                      <TableCell>{historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {historyRow.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productname: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }),
    ).isRequired,
     
     
  }).isRequired,
};
 
const useStyle = makeStyles((theme)=>({
  root: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20)

  }

}));
export default function Order() {
  const classes = useStyle();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};
  useEffect( ()=> {
    fetchOrder();
    
    return;
  }, [])

  const fetchOrder = async() => {
    axios.post('/api/order/findOne',{username:cookieMan.loginUser()})
        .then(res => {
            setRows(res.data.reverse());

        })
        .catch(err => console.log(err.data));
}

  return (  
    <div>
    <Container className={classes.root}>
    <TableContainer component={Paper} style={{ marginBottom: 20}}>
    
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell  />
             
            <TableCell align="center">
                
              Order Number
            
            </TableCell>
            <TableCell align="center">Created Time</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Total Paid</TableCell>
            <TableCell align="center">Complete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody  >
        { 
        rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
      <Row key={row._id} row={row} />
      
    ))}
        </TableBody>
      </Table>
       
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
  />
    </Container>
    
    
    <Footer/>
    </div>
    
  );
}
