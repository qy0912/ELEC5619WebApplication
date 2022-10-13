import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import axios from 'axios';
import {Alert} from '@mui/material'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material//Close'
import {useNavigate} from 'react-router-dom'
import productCookies from '../../productCookies';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15)
    },
    // input: {
    //     width: '75%'
    // },
    button: {
        paddingTop: theme.spacing(2)
    }
}))

function UpdateProduct() {  
    const classes = useStyles();
    const navigate = useNavigate();
    let productName = productCookies.getProduct()
    const [productDescription, setProductDescription] = useState(productCookies.getDescription())
    const [category, setCategory] = useState(productCookies.getCategory())
    const [price, setPrice] = useState(productCookies.getPrice())
    const [selectedFile, setSelectedFile] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [b64img, setB64Img] = useState('')

    // field check attributes
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')

    const [nameError, setNameError] = useState(false)
    const [nameErrorDes, setNameErrorDes] = useState('')

    const [priceError, setPriceError] = useState(false)
    const [priceErrorDes, setPriceErrorDes] = useState('')

    const [imgError, setImgError] = useState(false)
    const [imgErrorDes, setImgErrorDes] = useState('')

    const [catError, setCatError] = useState(false)
    const [catErrorDes, setCatErrorDes] = useState('')

    const handleUpload = (e) => {
        e.preventDefault()

        let cond = true
        let statusCode = 0
        let postError = ''
        if(productName === '' || price <0 || category === '') {
            cond = false
            validateAll()
        }

        // check if all required fields are properly set
        if(cond) {
            const product = {
                productname: productCookies.getProduct(),
                newPrice: price,
                newStock: 1,
                newImage: b64img,
                newDescription: productDescription,
                newCategory: category,
            }
            axios.post('/api/dashboard/product/modify', product)
            .then(res => {
                statusCode = res.status
           
                if (statusCode===200){
                    popMsg("success", "The product is successfully updated") 
                }
                else{
                    popMsg("error", "Failed to upload product.");
                }
                 
            })
            .catch(err => {
                if (err.response){
                    console.log(err.response)
                    popMsg("error", err.response.statusText);

                }
                console.log(err);
               
            });

        } else {
            popMsg("error", "Failed to upload product. Please check if all required fields are filled")
        }
    }

    const handleImageUpload = (e) => {
        setSelectedFile(e.target.files[0]);
        const file = e.target.files[0];
        convertBase64(file);
        setIsSelected(true); 
        setImgError(false)
        setImgErrorDes('')        
    }

    const convertBase64 = (file) => {
 
        
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setB64Img(reader.result.substring(23));
        }
    }

    const ReportNameError = (val) => {
        setNameError(val)
        if(val === true) {
            setNameErrorDes("Please fill in the product name")
        } else {
            setNameErrorDes("")
        }
    }

    const checkSetPrice = (e) => {
        let res = !isNaN(+e.target.value)
        if(res && e.target.value !== "" && e.target.value >= 0) {
            setPriceError(false)
            setPrice(e.target.value)
            setPriceErrorDes("")
        } else {
            setPriceError(true)
            if(!res) {
                setPriceErrorDes("Input must be a number")
            } else {
                if (e.target.value < 0){
                    setPrice(e.target.value)
                    setPriceErrorDes("Price cannot be negative")
                } else {
                    setPriceErrorDes("Price cannot be empty")
                }
            }
        }
    }

    const onSetCategory = (e) => {
        setCatError(false)
        setCatErrorDes('')
        setCategory(e.target.value)
    }

    const popMsg = (type, msg) => {
        setOpen(true)
        setMsg(msg)
        setSeverity(type)
    }

    const validateAll = () => {
        if(productName === '') {
            setNameError(true)
            setNameErrorDes('Product name cannot be empty')
        }

        if(price === '') {
            setPriceError(true)
            setPriceError('Price cannot be empty')
        }

        if(category === '') {
            setCatError(true)
            setCatErrorDes('Category must be chosen')
        }

        if(b64img === '') {
            setImgError(true)
            setImgErrorDes('Please choose an image')
        }
    }

    return (
        <div className={classes.root}>
            <Container>
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

                <form noValidate autoComplete="off" onSubmit={handleUpload}>
                    <TextField
                        
                        onChange={(e) => setProductDescription(e.target.value)}
                        label={"Product Description"}
                        variant={"outlined"}
                        defaultValue={productDescription}
                        multiline
                        margin={"normal"}
                        fullWidth
                        row={4}
                    />

                    <TextField
                        error={priceError}
                        helperText={priceErrorDes}
                        onChange={(e) => checkSetPrice(e)}
                        label={"Product Price"}
                        variant={"outlined"}
                        required
                        defaultValue={price}
                        margin={"normal"}
                        fullWidth
                    />

                    <FormControl>
                        <FormLabel>Product Category </FormLabel>
                        <RadioGroup value={category} onChange={(e) => onSetCategory(e)}>
                            <FormControlLabel value="Meat" control={<Radio />}  label={"Meat"}/>
                            <FormControlLabel value="Vegetables" control={<Radio />}  label={"Vegetables"}/>
                            <FormControlLabel value="Fruits" control={<Radio />}  label={"Fruits"}/>
                            <FormControlLabel value="Dairy" control={<Radio />}  label={"Diary"}/>
                        </RadioGroup>
                    </FormControl>
                    <Typography
                        variant='body2'
                        color='error'
                    >
                        {catErrorDes}
                    </Typography>
                    <br/>
                    <Button
                        variant="contained"
                        component="label"
                        color={"primary"}
                    >
                        Upload Product Image
                        <input
                            id="image"
                            name="uploadedImage"
                            type="file"
                            hidden
                            accept="image/jpeg"
                            onChange={handleImageUpload}
                        >
                        </input>
                    </Button>

                    <Typography
                        variant="body2"
                        color='error'
                    >
                        {imgErrorDes}
                    </Typography>
                    <br/>

                    <Button
                        variant={"contained"}
                        endIcon={<PublishIcon/>}
                        color={"primary"}
                        onClick={handleUpload}
                        className={classes.button}
                    >
                        Update
                    </Button>
                </form>
            </Container>

        </div>
    );
}

export default UpdateProduct;