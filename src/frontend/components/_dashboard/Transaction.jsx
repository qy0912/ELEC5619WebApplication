import {Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Paper from '@mui/material/Paper';
import {makeStyles} from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import TableMoreMenu from "./table/TableMoreMenu";
import TablePagination from "@mui/material/TablePagination";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTime from "@mui/icons-material/AccessTime";

const headCells = [
    { id: '_id', numeric: false, disablePadding: false, label: 'Transaction Id' },
    { id: 'supplier', numeric: false, disablePadding: false, label: 'Supplier' },
    { id: 'customer', numeric: false, disablePadding: false, label: 'Customer' },
    { id: 'productname', numeric: false, disablePadding: false, label: 'Product Name' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' }
]

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    title: {
        paddingBottom: theme.spacing(5)
    }
}))

const Transaction = () => {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect( () => {
        axios
            .get("/api/transactionManager/total")
            .then((res) => {
              
                setRows(res.data);
            })
            .catch((error => {console.log(error)}))
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <AccessTime
                    style={{
                        color: "#586A57"
                    }}
                />
            </Avatar>
            <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%', textAlign:'center'}}>
                Transactions
            </Typography>
            <TableContainer>
                <Table aria-label={"customized table"}>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) =>
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                >
                                    {headCell.label}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `transaction-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        key={row._id}
                                    >
                                        <TableCell  id={labelId}>
                                            {row._id}
                                        </TableCell>
                                        <TableCell align="left">{row.supplier}</TableCell>
                                        <TableCell align="left">{row.customer}</TableCell>
                                        <TableCell align="left">{row.productname} </TableCell>
                                        <TableCell align="left">{"$ " + row.price}</TableCell>
                                    </TableRow>
                                );
                            })}
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
        </div>
    )
}

export default Transaction;