import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField,
    Typography,
    Card,
    Paper,
    Avatar
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import axios from 'axios';
import {Alert} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material//Close';
import {useNavigate} from 'react-router-dom';
import {makeStyles} from "@mui/styles";
import cookieMan from '../../cookieManager';
import {Box} from '@mui/material'
import AddRounded from '@mui/icons-material//AddRounded'


const useStyles = makeStyles((theme) => ({
    input: {
        width: '75%'
    },
    button: {
        paddingTop: theme.spacing(2)
    },
    paper: {
        paddingTop: theme.spacing(30)
    }
}))

function AddProduct() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [b64img, setB64Img] = useState('')
    const [unit,setUnit] = useState('per')
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

    const handleUpload = async(e) => {
        e.preventDefault()

        let cond = true
        let postRes = ''
        let postError = ''
        if(productName === '' || price < 0 || b64img === '' || category === '') {
            cond = false
            validateAll()
        }

        // check if all required fields are properly set
        if(cond) {
            const product = {
                productname: productName,
                price: price,
                supplier: cookieMan.loginUser(),
                unit:unit,
                description: productDescription,
                category: category,
                image: b64img,
                imagename: productName + " img",
                stock: 0,
            }
          
            let response = await axios.post('/api/dashboard/product/add', product)
            .then(res => {postRes = res.status
              
               popMsg("success", "The product is successfully uploaded")
            })
            .catch(err =>{
                if (err.response){
                  
                    popMsg("error", err.response.statusText);

                }
                
            })
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

    const checkSetProductName = (e) => {
        if(e.target.value === null || e.target.value === "") {
            ReportNameError(true)
        } else {
            setProductName(e.target.value)
            ReportNameError(false)
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
            }
            else {
                if (e.target.value < 0){
                    setPriceErrorDes("Price cannot be negative")
                    setPrice(e.target.value)
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
            setPriceErrorDes('Price cannot be empty')
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
        <Box sx={{
            padding: '2%',
            paddingLeft: '5%',
            paddingRight: '5%',
        }}>
            <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <AddRounded
                    style={{
                        color: "#586A57"
                    }}
                />
            </Avatar>
            <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%', textAlign:'center'}}>
                Add Product
            </Typography>
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
                <br/>
                <br/>
            </Collapse>

                <form noValidate autoComplete="off" onSubmit={handleUpload}>
                    <TextField
                        error={nameError}
                        onChange={(e) => checkSetProductName(e)}
                        label={"Product Name"}
                        variant={"outlined"}
                        className={classes.input}
                        required
                        fullWidth
                        margin={'normal'}
                        helperText={nameErrorDes}
                        inputProps={{ "data-testid": "productName" }}
                    />

                    <TextField
                        className={classes.input}
                        fullWidth
                        onChange={(e) => setProductDescription(e.target.value)}
                        label={"Product Description"}
                        inputProps={{ "data-testid": "productDescription" }}
                        variant={"outlined"}
                        multiline
                        margin={'normal'}
                        row={4}
                    />

                    <TextField
                        id={"textfield-setprice"}
                        error={priceError}
                        fullWidth
                        className={classes.input}
                        helperText={priceErrorDes}
                        onChange={(e) => checkSetPrice(e)}
                        label={"Product Price"}
                        variant={"outlined"}
                        required
                        inputProps={{ "data-testid": "productPrice" }}
                        margin={'normal'}
                    />

                    <div style={{ marginTop: 20}}>
                        <FormControl fullWidth>
                            <FormLabel sx={{marginLeft:'auto', marginRight: 'auto', marginBottom: '2%'}}>Product Category </FormLabel>
                            <RadioGroup row value={category}  data-testid={'category'} onChange={(e) => onSetCategory(e)}>
                                <FormControlLabel sx={{marginRight: '18%'}} value="Meat" control={<Radio />}  label={"Meat"} data-testid={'meat'}/>
                                <FormControlLabel sx={{marginRight: '20%'}} value="Vegetables" control={<Radio />}  label={"Vegetables"}/>
                                <FormControlLabel sx={{marginRight: '20%'}} value="Fruits" control={<Radio />}  label={"Fruits"}/>
                                <FormControlLabel sx={{marginRight: '0%'}} value="Dairy" control={<Radio />}  label={"Diary"}/>
                            </RadioGroup>
                        </FormControl>
                        <Typography
                            variant='body2'
                            color='error'
                        >
                            {catErrorDes}
                        </Typography>
                    </div>

                    <br/>
                    <Button
                        id={"submitImage"}
                        variant="contained"
                        component="label"
                        color={"primary"}
                        fullWidth
                        data-testid={"imageButton"}
                        className={classes.button}
                    >
                        Upload Product Image
                        <input
                            id="image"
                            name="uploadedImage"
                            type="file"
                            hidden
                            fullWidth
                            accept="image/jpeg"
                            onChange={handleImageUpload}
                            data-testid={"image"}
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
                        id={"submit"}
                        type="submit"
                        variant={"contained"}
                        endIcon={<PublishIcon/>}
                        color={"primary"}
                        onClick={handleUpload}
                        disabled={(priceError|| nameError || imgError || catError)}
                        className={classes.button}
                        data-testid={"uploadButton"}
                        fullWidth
                    >
                        Upload
                    </Button>

                </form>
        </Box>
    );
}

export default AddProduct;