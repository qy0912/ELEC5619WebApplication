import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
import {FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from '@mui/material'
import '../css/landing.css'
import {makeStyles} from "@mui/styles";
import Footer from "../components/Footer";
import PlacesAutocomplete from 'react-places-autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Geocode from "react-geocode";
import axios from 'axios';
import cookieMan from '../cookieManager';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'

const steps = ['Choose payment methods', 'Delivery', 'Finish Checkout'];
Geocode.setApiKey("AIzaSyBoI3Ldc9EcNRls60WDQOEauFJGNlh2rBM");
Geocode.enableDebug();



const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    minHeight: 500,
    display: 'block',
    margin: 'auto',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(5)
  },


}))



export default function Checkout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [address, setAddress] = React.useState('');
  const [State,setState] = React.useState('');
  const [City,setCity] = React.useState('');
  const [PostCode,setPostcode] = React.useState('');
  const [Country,setCountry] = React.useState('');
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('success')

  const [cardHolder, setCardHolder] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState(0);
  const [cvv, setCvv] = React.useState(0);
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  const [cardHolderErr, setCardHolderErr] = React.useState(false)
  const [cardNumberErr, setCardNumberErr] = React.useState(false)
  const [cvvErr, setCvvErr] = React.useState(false)
  const [monthErr, setMonthErr] = React.useState(false)
  const [yearErr, setYearErr] = React.useState(false)
  const [cardHolderText, setCardHolderText] = React.useState('')
  const [cardNumberText, setCardNumberText] = React.useState('')
  const [cvvText, setCvvText] = React.useState('')
  const [monthText, setMonthText] = React.useState('')
  const [yearText, setYearText] = React.useState('')
  const [delivery, setDelivery] = React.useState('Delivery')

  const [payValidated, setPayValidated] = React.useState(false)

  useEffect(() => {
    creditCardValidation()
  })

 const onSetDelivery = (e)=>{
   setDelivery(e.target.value)
 }
  const handleSelect = async (value) => {
    setAddress(value)
     
    Geocode.fromAddress(value).then(
      (response) => {
        let city, postcode,state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "postal_code":
                postcode = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
    
    setCity(city);
    setCountry(country);
    setPostcode(postcode);
    setState(state);
     
    
      },
      (error) => {
        console.error(error);
      }
    ); 
   
     

  };
 
  const handleUpload = () => {
   
    if (delivery === "Delivery" && address===''){
      setMsg("You should enter your address for this option!");
      setSeverity('error');
      setOpen(true);
      return;
    }
   
    let query  = {
      username: cookieMan.loginUser(),
      //products:[],
      address:{
        address: address,
        country:Country,
        state: State,
        city: City,
        postcode: PostCode,

      }
      
    }
  if (delivery !=="Delivery"){
    query.address.address = "Pickup At Store";
    query.address.country= "null";
    query.address.state = "null";
    query.address.city= "null";
    query.address.postcode = "null"
    
  }
   
     
    axios.post('/api/order/add', query)
        .then(res => {
          axios.post('/api/shoppingCart/remove', {username: cookieMan.loginUser()})
          .then(()=>{
          })
        .catch(err =>{console.log(err)})
            
        })
        .catch(err =>{
            if (err.response){
                console.log(err.response)
            }
        })
  }
 
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if(activeStep === 1) {
       
      if (delivery === "Delivery" && address===''){
        
        setMsg("You should enter your address for this option!");
        setSeverity('error');
        setOpen(true);
        return;
      }
      handleUpload()
      
    }
    if(activeStep === 2) {
      navigate('/')
    }
 

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setPayValidated(true)
     
     
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 0) {
      navigate('/shoppingCart')
    }
  };

   

  const handleReset = () => {
    setActiveStep(0);
  };

  const cardHolderOnChange = (e) => {
    var letters = /^[A-Za-z]+$/;
    var ifAllLetters = e.target.value.match(letters)

    if(e.target.value !== '' && ifAllLetters) {
      setCardHolder(e.target.value) 
      setCardHolderErr(false)
      setCardHolderText('')
    } else {
      setCardHolderErr(true)
      if(e.target.value === '') {
        setCardHolderText('Please enter a valid cardholder name')
      }
      else if(!ifAllLetters) {
        setCardHolderText('A valid cardholder name should only contains letters')
      } 
      setCardHolder('')
    }
    //creditCardValidation()
  }

  
  const cardNumberOnChange = (e) => {
    const val = e.target.value
    var numbers = /^[0-9]+$/;
    var ifAllNumbers = e.target.value.match(numbers)
    if(val !== '' && val.length === 16 && ifAllNumbers) {
      setCardNumberErr(false)
      setCardNumberText('')
      setCardNumber(val)
    } else {
      setCardNumberErr(true)
      if(val === '') {
        setCardNumberText('Card number cannot be empty')
      } else if(!ifAllNumbers) {
        setCardNumberText('The credit card numebr should only contain digits.')
      }else if(val.length !== 16) {
        setCardNumberText('The length of card number must be 16.')
      }  else {
        setCardNumberText('Invalid card number, please check again!')
      }
      setCardNumber('')
    }
    //creditCardValidation()
  }

  
  const cardCvvOnChange = (e) => {
    const val = e.target.value
    var numbers = /^[0-9]+$/;
    var ifAllNumbers = val.match(numbers)
    if(val !== '' && val.length === 3 && ifAllNumbers) {
      setCvvErr(false)
      setCvvText('')
      setCvv(val)
    } else {
      setCvvErr(true)
      if(val === '') {
        setCvvText('Cvv must not be left empty.')
      } else if(!ifAllNumbers) {
        setCvvText('Cvv should only consist of numbers.')
      } else if(val.length !== 3) {
        setCvvText('Cvv must only be 3 digits.')
      } else {
        setCvvText('Cvv invalid, please check again.')
      }
      setCvv('')
    }
    //creditCardValidation()
  }

  
  const monthOnChange = (e) => {
    const val = e.target.value
    var numbers = /^[0-9]+$/;
    var ifAllNumbers = val.match(numbers)
    var ifTwoDigits = val.length === 2
    if(ifTwoDigits && ifAllNumbers && val!=='' && val <= 12 && val > 0) {
      setMonthErr(false)
      setMonthText('')
      setMonth(val)
    } else {
      setMonth('')
      setMonthErr(true)

      if(val === '') {
        setMonthText('Expiration date cannot be empty')
      } else if(!ifAllNumbers || !ifTwoDigits) {
        setMonthText('Month must be in format MM')
      } else if(val > 12 || val <= 0) {
        setMonthText('Month is invalid, it should be from 01 to 12')
      }
    }
    //creditCardValidation()
  }

  const yearOnChange = (e) => {
    const val = e.target.value
    var numbers = /^[0-9]+$/;
    var ifAllNumbers = val.match(numbers)
    var ifTwoDigits = val.length === 2
    if(ifTwoDigits && ifAllNumbers && val!=='' && val <= 99 && val > 0) {
      setYearErr(false)
      setYearText('')
      setYear(val)
    } else {
      setYearErr(true)
      if(val === '') {
        setYearText('Expiration date cannot be empty')
      } else if(!ifAllNumbers || !ifTwoDigits) {
        setYearText('Year must be in format YY')
      } else if(val <= 0|| val > 99) {
        setYearText('Year is invalid, it should be from 01 to 99')
      } else {
        setYearText('invalid Year, please check again.')
      }
      setYear('')
    }
    //creditCardValidation()
  }

  const creditCardValidation = () => {
    if(!(cardHolderErr || cardNumberErr || cvvErr || yearErr || monthErr) && 
      cardHolder !== '' && cardNumber !== '' && cvv !== '' && year !== '' && month !== ''
    ) {
      setPayValidated(true)
    } else {
      setPayValidated(false)
    }
  }
  return (
      <div>
      <Box className={classes.root}>
        <Stepper
          activeStep={activeStep}
          style={{ backgroundColor: "transparent", marginBottom: 10}}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box
          sx={{
            display: 'block',
            minHeight: 200
          }}
        >
        {activeStep === 0 &&
            <div>
              <TextField
                  error={cardHolderErr}
                  helperText={cardHolderText}
                  required
                  variant="outlined"
                  fullWidth
                  autoFocus
                  type="text"
                  label='Cardholder Name'
                  onChange={e => cardHolderOnChange(e)}
                  margin={"normal"}
              />


              <TextField
                  error={cardNumberErr}
                  helperText={cardNumberText}
                  required
                  variant="outlined"
                  fullWidth
                  autoFocus
                  type="text"
                  label='Card Number'
                  onChange={e => cardNumberOnChange(e)}
                  margin={"normal"}
              />

              <TextField
                  error={cvvErr}
                  helperText={cvvText}
                  required
                  variant="outlined"
                  style={{ m: 1, width: '50%', paddingRight: '4%'}}
                  autoFocus
                  type="text"
                  label='CVV'
                  onChange = {e => cardCvvOnChange(e)}
                  margin={"normal"}
              />

              <TextField
                error={monthErr}
                helperText={monthText}
                required
                variant="outlined"
                style={{ m: 1, width: '25%', paddingRight: '2%'}}
                autoFocus
                type="text"
                label='Expiration date MM'
                onChange = {e => monthOnChange(e)}
                margin={"normal"}
              />  
              
              <TextField
                  error={yearErr}
                  helperText={yearText}
                  required
                  variant="outlined"
                  style={{ m: 1, width: '25%'}}
                  autoFocus
                  type="text"
                  label='Expiration date YY'
                  onChange = {e => yearOnChange(e)}
                  margin={"normal"}
              />
            </div>
        }

        {activeStep === 1 &&
            <div>
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
              <br/>
              <br/>
            <FormControl>
            <FormLabel component="legend">Delivery Options</FormLabel>
            <RadioGroup
              aria-label="option"
              defaultValue="Delivery"
              name="radio-buttons-group"
              value={delivery} onChange={(e) => onSetDelivery(e)}
            >
              <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
              <FormControlLabel value="Pickup At Store" control={<Radio />} label="Pickup At Store" />
            </RadioGroup>
          </FormControl>

              <PlacesAutocomplete
                value = {address}
                onChange = {setAddress}
                onSelect  = {handleSelect}
              >
              {({getInputProps,suggestions, getSuggestionItemProps})=>(
                <div>
                   <TextField {...getInputProps({placeholder:"Input address"})}
                      required
                      variant="outlined"
                      fullWidth
                      autoFocus
                      type="text"
                      label='Address' margin="normal"
                   />
                   
                  <div>
                    <Box>
                    {suggestions.map(suggestion =>{
                      const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#dfdbb6', cursor: 'pointer' };

                      return (
                        <div {...getSuggestionItemProps(suggestion,{style})}>
                          <br/>
                           <LocationOnIcon/>
                           {suggestion.description}
                        </div>
                      );
                    })}
                    </Box>
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
                
            <TextField  
               
              style={{ m: 1, width: '25%',paddingRight: '3%' }}
              enable = "false"
              value = {Country}
              variant="outlined"
              autoFocus
              fullWidth
              type="text"
              label='Country'
              margin="normal"
            />
             <TextField         
               
              value = {State}
              enable = "false"
              variant="outlined"
              fullWidth
              style={{ m: 1, width: '25%',paddingRight: '25%' }}
              autoFocus
              type="text"
              label='State'
              margin="normal"
                  />
          
            <TextField     
                 
                value = {City}
                enable = "false"
                variant="outlined"
                fullWidth
                autoFocus
                style={{ m: 1, width: '25%',paddingRight: '3%' }}
                type="text"
                label='City'
                margin="normal"
            />
             <TextField  
                style={{ m: 1, paddingRight: 0 }}
                 
                value = {PostCode}
                variant="outlined"
                style={{ m: 1, width: '25%',paddingRight: '3%' }}
                enable = "false"
                autoFocus
                type="text"
                label='PostCode'
                margin="normal"
                fullWidth
              /> 
             
         

            </div>
        }

        {activeStep === 2 &&
            <div>
              <p
                className="central_heading1 central_heading2"
                style={{
                  fontSize: '2vw',
                  textAlign: 'center',
                  left: '50%',
                  top: '35%',
                  color: "#586A57"
                }}
              >
                  Congratulations, you've finished the purchase!
              </p>
            </div>
        }
        </Box>

        {/*All steps are finished */}
        <Box sx={{ 
            display: 'flex',
            marginTop: '5%',
            paddingTop: '3%',
            height: '20%'
         }}>
              <Button
                variant="contained"
                color="primary"
                style={{width:"15%"}}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto'
            }} />

              <Button disabled={!payValidated} onClick={handleNext} color="primary" variant="contained" style={{width:"15%"}}>
              
              {/* <Button onClick={handleNext} color="primary" variant="contained" style={{width:"15%"}}> */}
              
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'   }
              </Button>
            </Box>
      </Box>
        <Footer/>
      </div>
  )
}