import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    Stack,
    Typography,
    Paper
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import cookieMan from '../cookieManager';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material//Close'
import {Alert} from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
       paddingTop: theme.spacing(20)
   },
    icon: {
       paddingTop: theme.spacing(2)
    }
}))

function CurrentPasswordCheck() {
    const [nameEmailActive, setnameEmailActive] = useState(false);
    const [sendEmailActive, setsendEmailActive] = useState(false);
    const [codeActive, setcodeActive] = useState(true);
    const [passwordActive, setpasswordActive] = useState(true);
    const [saveCode, setSaveCode] = useState('');
    
    const [username, setUsername] = useState({
        password: '',
        showPassword: false,
      })
    const [email, setEmail] = useState({
        password: '',
        showPassword: false,
      })
    const [code, setCode] = useState({
        password: '',
        showPassword: false,
      })
    const [currentPassword, setCurrentPassword] = useState({
        password: '',
        showPassword: false,
      })
    const [newPassword, setNewPassword] = useState({
        password: '',
        showPassword: false,
      })
    const [confirmPassword, setConfirmPassword] = useState({
        password: '',
        showPassword: false,
      })
 
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')
    const classes = useStyles()
 

    const handleChangeUsername = (prop) => (event) => {
        setUsername({ ...username, [prop]: event.target.value });
    };

    const handleChangeEmail = (prop) => (event) => {
        setEmail({ ...email, [prop]: event.target.value });
    };

    const handleChangeCode = (prop) => (event) => {
        setCode({ ...code, [prop]: event.target.value });
    };

    const handleNewChange = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

    const handleConfirmChange = (prop) => (event) => {
        setConfirmPassword({ ...confirmPassword, [prop]: event.target.value });
    };

    const handleClickShowPassword1 = () => {
        setNewPassword({
          ...newPassword,
          showPassword: !newPassword.showPassword,
        });
    };

    const handleClickShowPassword2 = () => {
        setConfirmPassword({
          ...confirmPassword,
          showPassword: !confirmPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const returnBack = (e) => {
        navigate("/setting")
    }

    const handleVerifyEmail = (e) => {
        const verInfo = {
            username: username.password,
            email: email.password
        }
        
        if (username.password !== '' || email.password !== '') {
            axios.post('/api/user/verifyemail', verInfo)
                .then(res => {
                    if (res.data.status === "Success") {
                        setMsg("Verify email sent Successfully!");
                        setSeverity('success');
                        setOpen(true);
                        setnameEmailActive(true)
                        setcodeActive(false)

                        let sendCode = "";
                        for (let i = 0; i < 6; i++) {
                            sendCode += parseInt(Math.random()*10);
                        }
                        let data = {"code": sendCode, "email": email.password};
                        axios.post('/api/email/sendEmail', data)
                            .then(res => {
                                
                            })
                            .catch(err => console.log(err.data));
                        setSaveCode(sendCode);

                    } else {
                        setMsg("Username and email cannot match!");
                        setSeverity('error');
                        setOpen(true);
                    }
                })
        } else {
            alert("Please enter your username or password")
        }
    }

    const handleVerify = (e) => {
       
        if (saveCode === code.password) {
            setMsg("Email Verified Successfully!");
            setSeverity('success');
            setOpen(true);
            setcodeActive(true);
            setpasswordActive(false);
            setsendEmailActive(true)
        } else {
            setMsg("Wrong Verify Code");
            setSeverity('error');
            setOpen(true);
        }
    }


    const handleReset = (e) => {
        e.preventDefault()
        
        if (newPassword.password === '' || confirmPassword.password === '') {
            setMsg('New password and confirmPassword cannot be empty');
            setSeverity('error')
            return;
        }

        const resetInfo = {
            username: username.password,
            password: confirmPassword.password
        }
        
        if (newPassword.password === confirmPassword.password) {
            axios.post('/api/user/updatepassword', resetInfo)
                .then(res => {
                    if (res.data.status === "Password Updated") {
                        setMsg("Password Update Successfully!");
                        setSeverity('success');
                        setOpen(true);
                        alert("Password reset successfully!")
                        navigate("/login")

                    } else {
                        alert("Password Update Failed!");
                    }
                })
        } else {
            setMsg("Two new passwords are not the same!");
            setSeverity('error');
            setOpen(true);
        }


    }


    return (
         
        <Container
            className={classes.root}
            maxWidth={"xs"}
        >
            <Paper>
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

            <Stack direction={"row"} justifyContent={"center"}>
                <Typography variant={"h5"}>
                    Reset Your Password
                </Typography>
            </Stack>

            <form noValidate autoComplete="off" onSubmit={handleReset}>
                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            disabled = {nameEmailActive}
                            type={username.showPassword ? 'text' : 'username'}
                            value={username.password}
                            onChange={handleChangeUsername('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    
                                </InputAdornment>
                            }
                            label="UserName"
                        />
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            disabled = {nameEmailActive}
                            type={email.showPassword ? 'text' : 'email'}
                            value={email.password}
                            onChange={handleChangeEmail('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    
                                </InputAdornment>
                            }
                            label="Email Address"
                        />
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                        <Button
                            fullWidth
                            disabled = {sendEmailActive}
                            color={"success"}
                            variant={"contained"}
                            onClick={() => {handleVerifyEmail()}}>
                            send verify email
                        </Button>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                    <InputLabel htmlFor="outlined-adornment-password">Verify Code</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            disabled = {codeActive}
                            type={code.showPassword ? 'text' : 'code'}
                            value={code.password}
                            onChange={handleChangeCode('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    
                                </InputAdornment>
                            }
                            label="Verify Code"
                        />
                    </FormControl> 

                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                        <Button
                            fullWidth
                            disabled = {codeActive}
                            color={"success"}
                            variant={"contained"}
                            onClick={() => {handleVerify()}}>
                            Verify
                        </Button>
                    </FormControl>   








                    <FormControl variant="outlined" fullWidth margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={newPassword.showPassword ? 'text' : 'password'}
                            disabled = {passwordActive}
                            value={newPassword.password}
                            onChange={handleNewChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                        />
                    </FormControl>

                    <FormControl  variant="outlined" fullWidth margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={confirmPassword.showPassword ? 'text' : 'password'}
                            disabled = {passwordActive}
                            value={confirmPassword.password}
                            onChange={handleConfirmChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {confirmPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>

                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        className={classes.icon}
                    >
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={returnBack}
                        >
                            GO BACK
                        </Button>

                        <Button
                            type="submit"
                            variant={"contained"}
                            endIcon={<PublishIcon/>}
                            color={"primary"}
                            onClick={handleReset}
                            disabled = {passwordActive}
                        >
                            Reset Password
                        </Button>
                    </Stack>
            </form>
            </Container>
            </Paper>
        </Container>
    );
}

export default CurrentPasswordCheck;

