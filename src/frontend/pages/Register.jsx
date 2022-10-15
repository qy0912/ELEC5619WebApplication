import React, {useState} from 'react';
import axios from 'axios';
import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Typography,
    Avatar,
    Switch,
    MenuItem,
    TextField, Alert, Snackbar
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop: theme.spacing(10)
    },
    item: {
        marginTop: 5
    }
}))

const Register = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
   // const [emailError, setEmailError] = useState(false);
    const [nameDesc, setNameDesc] = useState('');
     
    const [passwordDesc, setPasswordDesc] = useState('');
    const [confirmDesc, setConfirmDesc] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('success');
    // const [code, setCode] = useState('');
    // const [enterCode, setEnterCode] = useState('');
    // const [codeActive, setCodeActive] = useState(false);
    // const [enterCodeError, setEnterCodeError] = useState(false);
    // const [enterCodeDesc, setEnterCodeDesc] = useState('');

    const signup = (username, password) => {
        if (validateAll() === true){
            let data = {"username": username, "password": password};
            axios.post('/api/user/signup', data)
                .then(res => {
                    if (res.data.message === "User registered!") {
                        
                        setOpenAlert(true);
                        setMessage("Successfully Sign up Welcome!");
                        navigate("/login");
                    } 
                })
                .catch(err => {
                    setOpenAlert(true);
                        setMessage("Username already exist, try another one!");
                        setColor('error');
                        console.log(err.data)
                });
        } 
    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setOpenAlert(false);
    }


     const validateAll = () => {
        let pass = true;
        if (username === '') {
            setNameError(true);
            setNameDesc('Username cannot be empty');
            pass = false;
        }

         

        if (password === '') {
            setPasswordError(true)
            setPasswordDesc('Password cannot be empty');
            pass = false;
        }


        if (password !== confirm) {
            setConfirmError(true);
            setConfirmDesc('The passwords are not the same');
            pass = false;
        }

         
        return pass;
    }

    
 

    const handleChangeName = (event) => {
        if (event.target.value !== ''){
            setUsername(event.target.value);
            setNameError(false);
            setNameDesc('');
        } else {
            setNameError(true);
            setNameDesc('Username cannot be empty');
        }
    }

     

    const handleChangePassword = (event) => {
        if (event.target.value !== '' && event.target.value.length >= 6 && event.target.value.length <= 15) {
            setPassword(event.target.value);
            setPasswordError(false);
            setPasswordDesc('');
        } else {
            setPasswordError(true);
            if(event.target.value === '') {
                setPasswordDesc('Password cannot be empty');
            }else if(event.target.value.length < 6) {
                setPasswordDesc('Password length must not be les than 6')
            } else if(event.target.value.length > 15) {
                setPasswordDesc('Password length should not be greater than 15')
            } else {
                setPasswordDesc('Invalid password')
            }
        }
    }

    const handleChangeConfirm = (event) => {
        if (event.target.value !== '') {
            setConfirm(event.target.value);
            setConfirmError(false);
            setConfirmDesc('');
        } else {
            setConfirmError(true);
            setConfirmDesc('Confirm password cannot be empty')
        }
    }

    return (
            <Container className={classes.root}>
                <Container maxWidth={"xs"}>
                    <CssBaseline />
                    <div
                        style={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            style={{
                                margin: 10,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <LockIcon
                                style={{
                                    color: "#586A57"
                                }}
                            />
                        </Avatar>

                        <Typography variant={"h5"} component={"h1"}>
                            Sign Up
                        </Typography>

                        <form noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={nameError}
                                        helperText={nameDesc}
                                        id="username"
                                        label="Username"
                                        name="userName"
                                        inputProps={{ "data-testid": "account-signup-username" }}
                                        onChange={(e)=>{handleChangeName(e)}}
                                        style={{
                                            marginTop: 15
                                        }}
                                    />
                                </Grid>

                                 

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={passwordError}
                                        helperText={passwordDesc}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        inputProps={{ "data-testid": "account-signup-password" }}
                                        onChange={(e)=>{handleChangePassword(e)}}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="pwd"
                                        variant={"outlined"}
                                        type="password"
                                        label='Confirm Password'
                                        error={confirmError}
                                        helperText={confirmDesc}
                                        fullWidth
                                        required
                                        inputProps={{ "data-testid": "account-signup-confirm" }}
                                        onChange={(e)=>{handleChangeConfirm(e)}}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                        </form>

                        <Button
                            fullWidth
                            data-testid={"account-signup-button"}
                            color={"primary"}
                            variant={"contained"}
                            style={{
                                marginTop: 20,
                                marginBottom: 15
                            }}
                            onClick={() => signup(username,password,confirm)}>
                            Sign Up
                        </Button>

                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Link href="/login" variant="body2"
                                    style={{
                                        color: '#586A57'
                                    }}
                                >
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

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
            </Container>
        )
}
export default Register;