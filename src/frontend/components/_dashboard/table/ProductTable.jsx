import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import TableMoreMenu from "./TableMoreMenu";
import {Box} from "@mui/material";
import {filter} from "lodash";
import ProductTableToolbar from "./ProductTableToolbar";
import ProductTableHead from "./ProductTableHead";
import CookieMan from "../../../cookieManager";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import LocalMallIcon from '@mui/icons-material//LocalMall';
import {Avatar} from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
    },
    table: {
        minWidth: 900,
        minHeight: 500
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.productname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

function AddStockGroup(props) {
    const [stockToAdd, setStockToAdd] = useState(1);
    const [btnDisable, setBtnDisable] = useState(false)
    const {productname, refresh} = props

    const handleTextFieldInput = (e) => {
        let val = e.target.value
        let numbers = /^[0-9]+$/; 
        let ifNum = val.match(numbers)

        if(ifNum && val.length < 5 && val > 0) {
            setStockToAdd(val)
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
    }

    const request = {
        productname: productname,
        stockToAdd: Number(stockToAdd)
    }

    const addStockBtnOnClick = async() => {
        let response = await axios.post('/api/dashboard/product/addToStock', request)
            .then(res => {
               
                refresh('')
            })
            .catch(err =>{
                if (err.response){
                    console.log(err.response)
                }
        })
    }
    
    return (
        <div>  
            <TextField
            type="number"
            size="small"
            defaultValue='1'
            sx={{
                maxWidth: '100px',
            }}
            onChange={e => handleTextFieldInput(e)}
            />
            <Button disabled={btnDisable} onClick = {e => addStockBtnOnClick(e)}>Add</Button>
        </div>
    )

}


function ProductTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [filterName, setFilterName] = useState('');

    useEffect( ()=> {
        fetchProducts("");
        return;
    }, [])

    const handleDelete = () => {
        let data = {products: selected};
        axios.post('/api/dashboard/product/delete', data)
            .then(res => {
               
                setSelected([]);
                fetchProducts('');
            })
            .catch(err => console.log(err.data));
    };

    const fetchProducts = async(keyword) => {
        
        axios.post('/api/dashboard/product/get',{supplier:CookieMan.loginUser(), type: CookieMan.getType()})
            .then(res => {
               
                setRows(res.data);
            })
            .catch(err => console.log(err.data));
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.productname);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchByName = (event) => {
        
        setFilterName(event.target.value);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const filteredProducts = applySortFilter(rows, getComparator(order, orderBy), filterName);

    const isProductNotFound = filteredProducts.length === 0;



     

    return (
        <div>
            <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <LocalMallIcon
                    style={{
                        color: "#586A57"
                    }}
                />
            </Avatar>
            <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%', textAlign:'center'}}>
                Product List
            </Typography>
                <ProductTableToolbar
                    numSelected={selected.length}
                    onDelete={handleDelete}
                    filterName={filterName}
                    onFilterName={handleSearchByName}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="product table"
                    >
                        <ProductTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        {isProductNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Box fullwidth={"true"}>
                                            <Typography align="center" variant="subtitle1">
                                                Not found
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                No results found for &nbsp;
                                                <strong>&quot;{filterName}&quot;</strong>. Try checking for typos or using complete words.
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                        <TableBody>
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.productname);
                                    const labelId = `product-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.productname}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row.productname)}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.productname}
                                            </TableCell>
                                            <TableCell align="left">{row.category}</TableCell>
                                            <TableCell align="left">{"$ " + row.price}</TableCell>
                                            <TableCell align="left">{row.stock} </TableCell>
                                            <TableCell align="left">
                                                
                                                <AddStockGroup
                                                    productname={row.productname}
                                                    refresh={fetchProducts}
                                                />     
                                            </TableCell>
                                            <TableCell align="right">
                                                <TableMoreMenu
                                                    productName={row.productname}
                                                    price={row.price}
                                                    category={row.category}
                                                    stock={row.stock}
                                                    description={row.description}
                                                    fetchProducts={fetchProducts}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
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
    );
}

export default ProductTable