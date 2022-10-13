import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    Grid,
    MenuItem,
    TextField,
    InputAdornment, CssBaseline
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import cookieMan from '../cookieManager';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {makeStyles} from "@mui/styles";
import Footer from "../components/Footer";
import {useNavigate} from 'react-router-dom';
import {Alert} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material//Close';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(5),
        minHeight: '100vh'
    },
    order: {
        width: "100px"
    }
}))


//showCategory 1 -> viewFruit  2 -> viewVegetable  3 -> viewMeat  4 -> viewDiary  5 -> viewAll  6 -> viewPreference
//ordervalue state 1 -> Default  2 -> Price: low to high  3 -> Price: high to low
const Shopping = () => {
    const [value, setValue] = React.useState(6);
    const [textValue, setTextValue] = useState('');
    const [orderValue, setOrderValue] = useState(1);
    const navigate = useNavigate();
    const [products, setProductList] = useState([]);
    const classes = useStyles();

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        navigate("/shopping?"+"category="+event.target.value+"&order="+orderVal);
        jumpCategory = event.target.value;
        fetchProducts(null)
      };



    const [severity, setSeverity] = React.useState('success');
    const [open, setOpen] = React.useState(false)
    const [msg, setMsg] = React.useState('Successfully added to cart')

    useEffect( () => {
        fetchProducts("");
    }, [])


    let currentuser = cookieMan.loginUser();
    let jumpCategory = '5';
    let orderVal = '1';

    var loc = window.location.href;
    var n1 = loc.length;
    var n2 = loc.indexOf("?");
    var parameter = decodeURI(loc.substr(n2+1, n1-n2));
    var parameters  = parameter.split("&");
    var paValue = new Array();
    for (var i = 0; i < parameters.length; i++) {
        var m1 = parameters[i].length;
        var m2 = parameters[i].indexOf("=");
        var vvalue = parameters[i].substr(m2+1, m1-m2);
        paValue[i] = vvalue;
        if (i === 0) {
            jumpCategory = vvalue;
        }
        if (i === 1) {
            orderVal = vvalue;
        } 
    }

    

    const fetchProducts = async(keyword) => {
        if ((textValue === "")&&(jumpCategory!=='')&&(jumpCategory!=='6')&&(keyword === null || keyword === undefined || keyword==="")){
            let res = await axios.post('/api/dashboard/product/getsinglecategory', {category:jumpCategory, order:orderVal})
            if(res.status === 200){
                setProductList(res.data);
            }else{
                console.log("can not access")
            }   
        }else if((textValue === "")&&(keyword === null || keyword === undefined || keyword==="")){
            let res;
            if (currentuser !== undefined) {
                res = await axios.post('/api/dashboard/product/getwithpre', {username:currentuser, order:orderVal})
            } else {
                res = await axios.get('/api/dashboard/product/get')
            }
            if(res.status === 200){
                setProductList(res.data);
            }else{
                console.log("can not access")
            }            
        }else{
            let res;
            if (keyword === "" || keyword === null) {
                
                res = await axios.post('/api/dashboard/product/search', {key:textValue, category:jumpCategory, username:currentuser, order:orderVal})
            } else {
                
                res = await axios.post('/api/dashboard/product/search', {key:keyword, category:jumpCategory, username:currentuser, order:orderVal})
            }
            if(res.status === 200){
                setProductList(res.data);
            }else{
                console.log("can not access")
            }   
        }
    }

    const temp = (e) => {
        navigate("/shopping?"+"category="+value);
        jumpCategory = value;
        fetchProducts(null)
    }

    const handleOrderChange = (event) => {
        navigate("/shopping?"+"category="+jumpCategory+"&order="+event.target.value);
        setOrderValue(event.target.value);
        orderVal = event.target.value;
        fetchProducts(null);
    }

    const handleEnterChange = (event) => {
        setTextValue(event.target.value)
    }


    const getProductCard = (productObj,index) => {
        return (
          <Grid key={index} item xs={6} sm={4} md={2}>
              <ProductCard {...productObj} pop={popMsg}/>
          </Grid>
        );
    };

    const popMsg = (pMsg, pSeverity) => {
        setOpen(true)
        setMsg(pMsg)
        setSeverity(pSeverity)
    }

    return (
        <div>
            <Container className={classes.root}>
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

            <Stack spacing={1} direction="row">
                <div>
                    <TextField
                        onChange={handleRadioChange}
                        sx={{ width: 120 }}
                        select label="Category"
                    >
                        <MenuItem value="1">Fruit</MenuItem>
                        <MenuItem value="2">Vegetable</MenuItem>
                        <MenuItem value="3">Meat</MenuItem>
                        <MenuItem value="4">Diary</MenuItem>
                        <MenuItem value="5">All</MenuItem>
                        <MenuItem value="6">Preference</MenuItem>
                    </TextField>
                </div>

                <div>
                    <TextField
                        onChange={handleOrderChange}
                        select label="Order"
                        className={classes.order}
                    >
                        <MenuItem value="1">Default</MenuItem>
                        <MenuItem value="2">Price: low to high</MenuItem>
                        <MenuItem value="3">Price: high to low</MenuItem>
                    </TextField>
                </div>

                <TextField
                    fullWidth
                    id="filled-search"
                    label="Search field"
                    type="search"
                    onChange={handleEnterChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fetchProducts(e.target.value);
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                < SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                    style={{
                        marginBottom: 30,
                        top: 0,
                        backgroundColor: 'transparent',
                    }}
                />
            </Stack>

                <Grid container spacing={1.5}>
                    {products.map((productObj,index) => getProductCard(productObj,index))}
                </Grid>
                
            </Container>
            <Footer />
        </div>

    )
}

export default Shopping;