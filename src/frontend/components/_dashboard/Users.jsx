import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';
import { TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import {Avatar} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

function createData(name, calories, fat) {
  return { name, calories, fat};
}

/*
const rows = [
  createData('Frozen yoghurt', 'customer', 'active'),
  createData('Ice cream sandwich', 'supplier', 'active'),
  createData('Eclair', 'admin', 'inactive'),
  createData('Cupcake', 'super admin', 'active'),
  createData('Gingerbread', 'user', 'active'),
];
*/

export default function Users() {

    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [update, setUpdate] = React.useState(true)
    const [foundUser, setFoundUser] = React.useState("")

    useEffect(() =>{
       
        axios.get('/api/user')
        .then(res => { 
           
            setRows(res.data)
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
    },[update])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
    const handleChangeActiveStatus = (username, status) => {
        let req = {
            username: username,
            status: status
        }
        axios.post('/api/user/setActive', req)
        .then(res =>{
         
            setUpdate(!update)
        })
        .catch(err => console.log(err.response))
    }

    return (
        <Box sx={{ width: '100%', height: '100vh'}}>
            <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <GroupIcon
                    style={{
                        color: "#586A57"
                    }}
                />
            </Avatar>

            <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%', textAlign:'center'}}>
                Manage Users
            </Typography>
            <TextField  
                helperText="Enter a username to search a user"
                sx={{width: '100%'}}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setFoundUser(e.target.value);
                    }
                }}
            >
            </TextField>
            <TableContainer component={Paper} sx={{paddingTop: '1%', marginTop: '3%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.filter( (row)=>{return (foundUser==="" || foundUser === row.username)}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow
                        key={row.username}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.username}
                        </TableCell>
                        <TableCell align="center">{row.account_type}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">
                            {row.status=="Active" && <Typography sx={{color: "#97B597"}}>
                                Active
                            </Typography>}

                            {row.status=="Inactive" && <Typography sx={{color:"#ff384f"}}>
                                Banned
                            </Typography>}
                        </TableCell>
                        <TableCell align="center">
                            
                            {row.status === "Active" && 
                            <Button 
                                variant="outlined" 
                                sx={{minWidth: 95}}
                                onClick={e => handleChangeActiveStatus(row.username, "Inactive")}
                            >
                                BAN
                            </Button>}
                            {row.status === "Inactive" && 
                            <Button 
                                variant="outlined" 
                                sx={{minWidth: 95}} 
                                onClick={e => handleChangeActiveStatus(row.username, "Active")}
                            >
                                Unban
                            </Button>}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}