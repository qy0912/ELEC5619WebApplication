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
    Box,
    TextField, Alert, Snackbar
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";
import {Paper} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const useStyles = makeStyles((theme) => ({
    box: {
    },
    item: {
        marginTop: 5
    }
}))

const CreateAdmin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameDesc, setNameDesc] = useState('');
    const [emailDesc, setEmailDesc] = useState('');
    const [passwordDesc, setPasswordDesc] = useState('');
    const [confirmDesc, setConfirmDesc] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('success');
    const [code, setCode] = useState('');
    const [enterCode, setEnterCode] = useState('');
    const [codeActive, setCodeActive] = useState(false);
    const [enterCodeError, setEnterCodeError] = useState(false);
    const [enterCodeDesc, setEnterCodeDesc] = useState('');

    let userType = 'admin'

    const signup = (username, password, confirm) => {
        if (validateAll() === true){
          
            let data = {"username": username, "password": password, "email": email, "account_type": userType};
        
            axios.post('/api/user/add', data)
                .then(res => {
                    
                    if (res.data === "User added!") {
                        setOpenAlert(true);
                        setMessage("Successfully Sign up Welcome!");
                        navigate("/login");
                    } else {
                        setOpenAlert(true);
                        setMessage("Username already exist, try another one!");
                        setColor('error');
                    }
                })
                .catch(err => console.log(err.data));
        } else {
            console.log("error")
        }
    }

    const sendEmail = () => {
        let newCode = ''

        if (emailError) {
            return;
        }
        //send email
        for (let i = 0; i < 6; i++) {
            newCode += parseInt(Math.random()*10);
        }
        let data = {"code": newCode, "email": email};

     
        axios.post('/api/email/sendEmail', data)
            .then(res => {
                console.log("finish sending");
            })
            .catch(err => console.log(err.data));
        setCodeActive(true);
        setCode(newCode);
        setOpenAlert(true);
        setMessage("verify email has been sent");
        return;
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

        if (email === '') {
            setEmailError(true);
            setEmailDesc('Email address cannot be empty');
            pass = false;
        }

        if (password === '') {
            setPasswordError(true)
            setPasswordDesc('Password cannot be empty');
            pass = false;
        }

        if (confirm === '') {
            setConfirmError(true);
            setConfirmDesc('Confirm password cannot be empty');
            pass = false;
        }

        if (password !== confirm) {
            setConfirmError(true);
            setConfirmDesc('The passwords are not the same');
            pass = false;
        }

        if (enterCode === '') {
            setEnterCodeError(true);
            setEnterCodeDesc('Enter code cannot be empty')
            pass = false;
        } else {
            if (enterCode !== code) {
                setEnterCodeError(true);
                setEnterCodeDesc('Enter code is the not same as Email')
                pass = false;
            }
        }
        return pass;
    }

    const handleEnterCode = (event) => {
        if (event.target.value !== ''){
            setEnterCode(event.target.value);
            setEnterCodeError(false);
            setEnterCodeDesc('');
        } else {
            setEnterCodeError(true);
            setEnterCodeDesc('Enter Code cannot be empty')
        }
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

    const handleChangeEmail = (event) => {
        if (event.target.value !== ''){
            let Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
            if (!Regex.test(event.target.value)){
                setEmailError(true);
                setEmailDesc("Wrong Email Format");
            } else {
                setEmail(event.target.value);
                setEmailError(false);
                setEmailDesc('');
            }
        } else {
            setEmailError(true);
            setEmailDesc('Email address cannot be empty');
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
        <Box className={classes.box}>
                <Container sx={{width: '90%'}}>
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
                            <GroupAddIcon
                                style={{
                                    color: "#586A57"
                                }}
                            />
                        </Avatar>

                        <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%'}}>
                            Create Admin Account
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
                                        disabled={codeActive}
                                        helperText={emailDesc}
                                        error={emailError}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        inputProps={{ "data-testid": "account-signup-email" }}
                                        onChange={(e)=>{handleChangeEmail(e)}}
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
                                    <Button
                                        fullWidth
                                        sx={{backgroundCOlor: '#586a57'}}
                                        variant={"contained"}
                                        onClick={() => {sendEmail()}}>
                                        send verification email
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={enterCodeError}
                                        helperText={enterCodeDesc}
                                        id="email code"
                                        label="Email Verify Code"
                                        name="email code"
                                        inputProps={{ "data-testid": "account-signup-emailcode" }}
                                        onChange={(e)=>{handleEnterCode(e)}}
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
                            Create Account
                        </Button>
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
            </Box>
        )
}
export default CreateAdmin;