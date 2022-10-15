 
import cookieMan from '../cookieManager';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
    Button,
    Collapse,
    Container,
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'
import {makeStyles} from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from "../components/Footer";
import TablePagination from '@mui/material/TablePagination';
   
 

export default function Report(){
    const [catError, setCatError] = useState(false)
    const [catErrorDes, setCatErrorDes] = useState('')
    const [category, setCategory] = useState('Product quality issues')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')
    const onSetCategory = (e) => {
        setCatError(false)
        setCatErrorDes('')
        setCategory(e.target.value)
    }
    const navigate = useNavigate()
    const handleUpload = async ()=>{
        if (description===''|| title==''){
            setMsg("Please enter both title and description!");
            setSeverity('error');
            setOpen(true);
            return;
        }
        else{
            const issues = {
                reporter: cookieMan.loginUser(),
                 
                description: description,
                title: title,
                category: category
            }
            await axios.post('/api/issues/addIssue',issues)
                .then(res=>{
                    setMsg("Thanks for your feedback, we will contact you soon!");
                    setSeverity('success');
                    setOpen(true);
                    navigate('/report')
                })
                .catch(err=>{
                    setMsg("Something goes wrong, please try again!");
                    setSeverity('error');
                    setOpen(true);
                })

        }
         

    }
  return (  
    <div>
    <Container sx = {{paddingRight:30,paddingTop:20,paddingBottom:15}}>
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
    <TextField
         
        value={title}
        required
        variant="outlined"
        fullWidth
        autoFocus
        type="text"
        label='Title'
        onChange={e => {setTitle(e.target.value)}}
        margin={"normal"}
    />
    <div style={{ marginTop: 20}}>
        <FormControl>
            <FormLabel>Select Your Report Type </FormLabel>
            <RadioGroup value={category}  data-testid={'category'} onChange={(e) => onSetCategory(e)}>
                <FormControlLabel value="Product quality issues" control={<Radio />}  label={"Product quality issues"} data-testid={'Product quality issues'}/>
                <FormControlLabel value="System bugs" control={<Radio />}  label={"System bugs"}/>
                <FormControlLabel value="Shipping issues" control={<Radio />}  label={"Shipping issues"}/>
                <FormControlLabel value="Other issues" control={<Radio />}  label={"Other issues"}/>
            </RadioGroup>
        </FormControl>
        <Typography
            variant='body2'
            color='error'
        >
            {catErrorDes}
        </Typography>
    </div>
     

    <TextField
         
        value={description}
        required
        variant="outlined"
        fullWidth
        autoFocus
        type="text"
        label='Description'
        onChange={e => {setDescription(e.target.value)}}
        margin={"normal"}
    />
    <br/>
    <br/>
    
     <Button
        variant="contained"
        color="primary"
        display="block"
        style={{width:"15%"}}
        onClick = {handleUpload}
        sx={{ mr: 1 }}
        >
        Report this issue
        </Button>
     
    </Container>
    
    
    <Footer/>
    </div>
    
  );
}
