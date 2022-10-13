import {Alert, Box, Button, Container, CssBaseline, Divider, Grid, Snackbar, Stack} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {makeStyles, styled} from "@mui/styles";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import cookieMan from "../cookieManager";

const Title = styled('h1')(({theme}) => ({
    fontWeight: 400,
    margin:'auto'
}))

const SubTitle = styled('h3')(({
    fontWeight: 350,
    fontSize: "large",
    marginRight: '5%'
}))

const Category = styled('h3')(({theme}) => ({
    fontWeight: 100
}))

const Price = styled('span')(({
    fontWeight: 100,
    fontSize: '40px',
    marginTop: '5%',
}))

const DescText = styled('p')(({
    margin: '20px 0px'
}))

const DescTitle = styled('h2')(({
    fontWeight: 300
}))


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(10)
    },

    button: {
        padding: theme.spacing(10)
    },
}))

const ProductImg = styled('img')({
    top: 0,
    width: '50%',
    height: '50%',
    objectFit: 'cover',
    position: 'absolute',
})


const ProductDetail = () => {
    const classes = useStyles();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [supplier, setSupplier] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [color, setColor] = useState('success');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.post('/api/dashboard/product/findById', {_id: path});
            setTitle(res.data.productname);
            setPrice(res.data.price);
            setCategory(res.data.category);
            setDescription(res.data.description);
            setImage(res.data.image);
            setSupplier(res.data.supplier);
        }
        getProduct();
    }, [])

    const handleClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setOpenAlert(false);
    }

    const addToCart = () => {
        let username = cookieMan.loginUser();
        // if(username === null){
        //     navigate('/login');
        // }

        let data = {username: username, _id: title, amount: 1};
        axios.post('/api/shoppingCart/add', data)
            .then(res => {

                if(res.status === 200){
                   setMessage(title + ' has been added into cartTable successful');
                   setOpenAlert(true);
                }
            })
            .catch(err => {
                setColor('error');
                setMessage(err.data)
                setOpenAlert(true);
            });
    }

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item sm={10} md={5} xs={12} lg={6}>
                    <Box sx={{ pt: '100%', position: 'relative'}}>
                        <div style={{display: "flex", justifyContent:"center"}}>
                            <ProductImg src={`data:image/jpeg;base64,${image}`}/>
                        </div>
                    </Box>
                </Grid>

                <Grid item sm={10} md={5} xs={12} lg={6}>
                    <Container maxWidth={"md"}>
                        <Stack direction={'row'} justifyContent={"space-between"}>
                            <div style={{display: "block"}}>
                                <Title> {title} </Title>
                                <div style={{display: "flex"}}>
                                    <SubTitle>Category: </SubTitle>
                                    <Category> {category} </Category>
                                </div>

                                <div style={{display: "flex"}}>
                                    <SubTitle>Supplier: </SubTitle>
                                    <Category> {supplier === undefined ? ("Unknown") : supplier} </Category>
                                </div>

                            </div>

                            <Price> $ {price} </Price>
                        </Stack>

                        <Stack direction={"row"} justifyContent={"center"}>
                            <Button variant={"contained"} className={classes.button} onClick={addToCart}>
                                Add to bag
                            </Button>
                        </Stack>
                        <Divider style={{paddingTop: '5%'}}/>
                        <DescTitle> Description: </DescTitle>
                        <DescText> {description} </DescText>
                    </Container>
                </Grid>
            </Grid>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity={color}>
                    {message}
                </Alert>
            </Snackbar>
            <Footer/>
        </div>
    )
}

export default ProductDetail;