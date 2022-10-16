import React from 'react';
import { makeStyles, styled}  from '@mui/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
    Box,
    Button,
    Stack,
} from "@mui/material";
import axios from 'axios';
import cookieMan from '../cookieManager';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from "@mui/material/Link";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#586A57',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#586A57',
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'primary',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#586A57',
      },
        width: '75%',
        height: '70%',
    },
});


const ProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
})

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        [theme.breakpoints.down("sm")]:{
            maxWidth: 225,
        }
    },

    bagButton:{
        borderRadius: 50,
        marginTop: 10,
        width: 120,
        height: 35,
    },
    img: {
        marginTop: '5%',
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    text:{
        marginTop: 5,
    },
    header:{
        [theme.breakpoints.up("sm")]:{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    details:{
        marginTop: 10
    }
}));


const ProductCard = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {_id, productname, category, price, supplier, unit, description, image, pop} = props;
    const [qty, setQty] = React.useState(1)
    const [validated, setValidated] = React.useState(true)

    const [qtyError, setQtyError] = React.useState(false)
    const [qtyErrorMsg, setQtyErrorMsg] = React.useState('')

    function onChangeQty(e) {
        let val = e.target.value;
        let res = /^\d+$/.test(e.target.value);
        let numeric = parseInt(val, 10)

        if(res && +val > 0 && val !== '') {
            setQtyError(false);
            setQtyErrorMsg("");
            setQty(numeric);
            setValidated(true);
        } else {
            e.target.value = parseInt(qty, 10)
        }
    }

    function addToCart(){
        let username = cookieMan.loginUser();
        if(username === null){
            navigate('/login');
        }
       

        if(validated === false || qty === null) {
            return
        }


        let data = {username: username, productname: productname, amount: qty};
        axios.post('/api/shoppingCart/add', data)
            .then(res => {
                 
                if (res.status===201){
                    pop(res.data,'warning');
                   
                }
                else{
                    pop(qty + ' ' + productname + ' has been added to your cart!', 'success')

                }
                 
                 
            })
            .catch(err => console.log(err.data));
    }
    return (
        <Card
            className={classes.root}
        >

            <Box sx={{ pt: '100%', position: 'relative' }}>
                <Link to={`/${_id}`} color="inherit" underline="hover" component={RouterLink}>
                    <ProductImg
                        src={`data:image/jpeg;base64,${image}`}/>
                </Link>
            </Box>

            <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack sx={{ p: 3 }} justifyContent={"center"}>
                    <Link to={`/${_id}`} color="inherit" underline="hover" component={RouterLink}>
                        <Typography variant="subtitle2" noWrap>
                            {productname}
                        </Typography>
                    </Link>

                    <Typography variant={"subtitle3"} fontSize={"small"}>
                        {category}
                    </Typography>
                </Stack>

                <Stack justifyContent={"center"}>
                    <Typography marginRight={"15px"} data-testid={'price'}>
                        {"$ " + price}
                    </Typography>
                </Stack>

            </Stack>

            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ px: 1}}
            >

                <CssTextField
                    label="Quantity"
                    type="number"
                    defaultValue='1'
                    error={qtyError}
                    color='primary'
                    helperText={qtyErrorMsg}
                    inputProps={{ "data-testid": "quantity" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => onChangeQty(e)}
                />


                <Button
                    variant={"outlined"}
                    color={"primary"}
                    onClick={addToCart}
                    disabled={!validated}
                    sx={{
                        borderRadius: '35px',
                        height: '75%'
                    }}
                >
                    Buy
                </Button>
            </Stack>
        </Card>
    );
}

export default ProductCard
