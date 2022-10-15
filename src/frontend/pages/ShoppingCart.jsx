import React, {useEffect, useState} from 'react';
import cookieMan from '../cookieManager';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import ArrowDownwardSharpIcon from '@mui/icons-material//ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material//ArrowUpwardSharp';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Fab,
    Chip,
    Button, Stack, Box
} from '@mui/material';
import {Link as ReactLink, useNavigate} from 'react-router-dom';
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Footer from "../components/Footer";
import ShoppingCartTableToolbar from "../components/cartTable/ShoppingCartTableToolbar";
import ShoppingCartTableHead from "../components/cartTable/ShoppingCartTableHead";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        width: '100%',
        alignItems: "center",
    },
    paper: {
        width: '100%',
        minHeight: 600
    },
    table: {
        minWidth: 900,
        minHeight: '50%',
    },
    container: {
        paddingBottom: theme.spacing(20),
        minHeight: '75%',
    }

}))

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')
    const classes = useStyles();

    useEffect(() => {
        getAndSetShoppingCart()
    }, [])

    const add = (username,productname,index) => {
        let data = {"username":username, "productname":productname, "amount": 1};
        axios.post('/api/shoppingCart/add', data)
            .then(res => {
                
                if (res.status===201){
                     
                    setMsg(res.data);
                    setSeverity('error');
                    setOpen(true);
                    setLoading(false);
                    return;

                }
                if(res.data.error !== "failed"){
                    products[index].amount += 1;
                    setProducts(products);
                }
                setLoading(false);
            })
            .catch(err => console.log(err.data));
    }

    const addButton = (username, productname,index) => {
        return (
        <Fab id="add" color="primary" aria-label="add" size="small" onClick={()=>{
            setLoading(true);
            add(username, productname,index);
        }}>
            <ArrowUpwardSharpIcon />
        </Fab>);
    }

    const minus = (username,productname,index) => {
        let data = {"username":username, "productname":productname};
        axios.post('/api/shoppingCart/minus', data)
            .then(res => {
                if(res.data.error !== "failed"){
                    products[index].amount -= 1;
                    setProducts(products);
                }
                setLoading(false);
            })
            .catch(err => console.log(err.data));
    }

    const minusButton = (username,productname, index) => {
        return (
            <Fab id="minus" color="primary" aria-label="minus" size="small"  onClick={()=>{
                setLoading(true);
                minus(username, productname,index);
            }}>
                <ArrowDownwardSharpIcon />
            </Fab>
        )
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = products.map((n) => n.productname);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const getAndSetShoppingCart = () => {
        if(cookieMan.loginUser() === undefined){
            navigate('/login')
        }else{
            let username = cookieMan.loginUser();
            let data = { username: username};
            axios.post('/api/shoppingCart', data)
            .then(res => {
                if(res.data === null){
                    setProducts([]);
                    setLoading(false);
                }else{
                    setProducts(res.data.products);
                    setLoading(false);
                }
            })
            .catch(err => console.log(err.data));
        }
        return products;
    }

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

    const handleDelete = () => {
        setSelected([]);
    }

    const handleLoading = () => {
        setLoading(true);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
 

    const handleCheckout = async ()=>{
        await axios.post('/api/shoppingCart/',{username: cookieMan.loginUser()})
            .then(res=> {
                if (res.data===null || res.data.products.length===0){
                    setMsg("Your shopping cart is empty!");
                    setSeverity('error');
                    setOpen(true);
                    return;   


                }
                else{
                    navigate('/checkout')

                }

            })
            .catch(err=>{
            })
       
         
         

    }
    return(
        
        <div className={classes.root}>
             <Container className={classes.container}>
                     <Paper className={classes.paper}>
                        <ShoppingCartTableToolbar
                            getAndSetShoppingCart={getAndSetShoppingCart}
                            onDelete={handleDelete}
                            numSelected={selected.length}
                            selected={selected}
                            setLoading={handleLoading}
                        />
                        <TableContainer>
                        <Collapse in={open}>
                <Alert
                    severity = {severity}
                    action={
                        <IconButton
                            arial-label="close"
                            color="inherit"
                            size="small"
                            onClick={()=>{
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {msg}
                </Alert>
            </Collapse>
                            <Table
                                aria-labelledby="tableTitle"
                                size={'medium'}
                                aria-label="enhanced table"
                            >
                            <ShoppingCartTableHead
                                numSelected={selected.length}
                                rowCount={products.length}
                                onSelectAllClick = {handleSelectAllClick}
                            />
                            <TableBody>
                                {loading ? (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <Typography align="center" variant="subtitle1">
                                                    Loading...
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                                ) : (
                                    products.map((item, index)=>{
                                        const isItemSelected = isSelected(item.productname);
                                        const labelId = `shopping-cart-${index}`;
                                        return (
                                            <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={labelId}
                                                    aria-checked={isItemSelected}
                                                    selected={isItemSelected}
                                                >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onClick={(event) => handleClick(event, item.productname)}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>

                                                <TableCell omponent="th" id={labelId} scope="row" padding="none">
                                                    {item.productname}
                                                </TableCell>

                                                <TableCell align="right"> {item.price * item.amount} </TableCell>
                                                <TableCell id={labelId+"-amount"} align="right">
                                                    {addButton(cookieMan.loginUser(),item.productname,index)}
                                                    <Chip label={item.amount.toString()}/>
                                                    {minusButton(cookieMan.loginUser(),item.productname,index)}
                                                </TableCell>
                                            </TableRow>);
                                    }))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>

                         <Stack direction={"row"} justifyContent={"flex-end"}>
                             <Stack direction={"column"} justifyContent={"space-around"}>
                                 <div style={{display: "flex"}}>

                                 </div>

                                 <Button
                                     variant="contained"
                                     color="primary"
                                    //  component={ReactLink}
                                     onClick={handleCheckout}
                                     style={{margin: 20}}
                                 >
                                     Checkout
                                 </Button>
                             </Stack>
                         </Stack>
                    </Paper>
             </Container>
            <Footer/>
        </div>

    )
}

export default ShoppingCart

