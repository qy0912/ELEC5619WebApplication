import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    Stack,
    Typography,
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
 
    const handleChange = (prop) => (event) => {
        setCurrentPassword({ ...currentPassword, [prop]: event.target.value });
    };

    const handleNewChange = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

    const handleConfirmChange = (prop) => (event) => {
        setConfirmPassword({ ...confirmPassword, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setCurrentPassword({
          ...currentPassword,
          showPassword: !currentPassword.showPassword,
        });
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

    const handleUpdate = (e) => {
        e.preventDefault()
        let currentUserName = cookieMan.loginUser();

        const currentPasswordInfo = {
            username: currentUserName,
            password: currentPassword.password
        }
        if (currentUserName !== undefined) {
            axios.post('/api/user/login', currentPasswordInfo)
                .then(res => {
                    if (res.data.status === "Success") {
                        if (newPassword.password === '' || confirmPassword.password === '') {
                            setMsg('The new password cannot be empty')
                            setSeverity('error')
                            return;
                        }

                        if (newPassword.password === confirmPassword.password) {
                            const updatePasswordInfo = {
                                username: currentUserName,
                                password: newPassword.password
                            }

                            axios.post('/api/user/updatepassword', updatePasswordInfo)
                                .then(res => {
                                    if (res.data.status === "Password Updated") {
                                        setMsg("Password Update Successfully!");
                                        setSeverity('success');
                                        setOpen(true);

                                    } else {
                                        alert("Password Update Failed!");
                                    }
                                })

                        } else {
                            setMsg("Two new passwords are not the same!");
                            setSeverity('error');
                            setOpen(true);
                        }
                    } else {
                        setMsg("Wrong Current Password! Try again!");
                        setSeverity('error');
                        setOpen(true);
                    }
                })
        }
    }

    return (
         
        <Container
            className={classes.root}
            maxWidth={"xs"}
        >
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
                    Update Password
                </Typography>
            </Stack>

            <form noValidate autoComplete="off" onSubmit={handleUpdate}>
                    <FormControl fullWidth variant="outlined" margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={currentPassword.showPassword ? 'text' : 'password'}
                            value={currentPassword.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {currentPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <FormControl variant="outlined" fullWidth margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={newPassword.showPassword ? 'text' : 'password'}
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
                            onClick={handleUpdate}
                        >
                            Update Password
                        </Button>
                    </Stack>
            </form>
        </Container>
    );
}

export default CurrentPasswordCheck;


 