import React, {useEffect, useState} from 'react';
import {
    Button,
    Container, Link, Stack,
    TextField,
    Paper
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import cookieMan from '../cookieManager';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
 
const useStyles = makeStyles((theme)=> ({
    root: {
        paddingTop: theme.spacing(20)
    },
    button: {
        margin: theme.spacing(1)
    }
}))


function UserSetting() {
    const [newUserName, setNewUserName] = useState(cookieMan.loginUser())
    const [newEmail, setNewEmail] = useState(cookieMan.getEmail())
    const [newAddress, setNewAddress] = useState(cookieMan.getAddress())
    const [oldUserName, setOldUserName] = useState(cookieMan.loginUser())
    const [oldEmail, setOldEmail] = useState(cookieMan.getEmail())
    const [oldAddress, setOldAddress] = useState(cookieMan.getAddress())
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')
    const [nameError, setNameError] = useState(false)
    const [nameErrorDes, setNameErrorDes] = useState('')
    const navigate = useNavigate();
    const classes = useStyles();
    
    useEffect( () => {
        if (oldUserName === undefined) {
            navigate("/login")
        }}, []);

    const backToLogin = (e) => {
        e.preventDefault()
        navigate("/shopping?category=5&order=1");
    }

    const validateAll = () => {
        if(newUserName === '' || newUserName === undefined) {
            setNameError(true)
            setNameErrorDes('User name cannot be empty')
        }
    }
    const checkSetUserName = (e) => {
        setNewUserName(e.target.value)
        if(e.target.value === null || e.target.value=== '') {
            ReportNameError(true)
        } else {
            ReportNameError(false)
        }
    }

    const ReportNameError = (val) => {
        setNameError(val)
        if(val === true) {
            setNameErrorDes("Please fill in the User name")
        } else {
            setNameErrorDes("")
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        
        if(newUserName === oldUserName && newAddress === oldAddress && newEmail === oldEmail){
            if(newUserName === '' || newUserName === undefined){
                setMsg("You need to change at least one field!");
                setSeverity('error');
                setOpen(true);
            }
            setMsg("You need to change at least one field!");
            setSeverity('error');
            setOpen(true);
        } else {
            if (oldUserName !== undefined ) {
                if (newUserName !== 'undefined' && newUserName !== ''){
                    const newInfo = {
                        newUserName: newUserName,
                        newEmail: newEmail,
                        newAddress: newAddress,
                        currentUserName: oldUserName
                    }
                    axios.post('/api/user/setting', newInfo)
                    .then(res => {
                       

                        if(res.data.status === "UserUpdated"){
                            setMsg("Modify Successfully! ");
                            setSeverity('success');
                            setOpen(true);
                            const Type = cookieMan.getType()
                            setOldUserName(newUserName);
                            setOldEmail(newEmail);
                            setOldAddress(newAddress);
                            cookieMan.logout();
                            cookieMan.onLogin(newUserName,Type,newEmail,newAddress);

                        }else if(res.data.status === "Invalid"){
                            setMsg("Username already exist!");
                            setSeverity('error');
                            setOpen(true);
                        }
                    })
                }
                else{
                    validateAll()
                    setMsg("Username cannot be empty!");
                    setSeverity('error');
                    setOpen(true);
                }
            }
        }
    }

    return (
        <Container className={classes.root} maxWidth={"xs"}>
        <Paper>
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

            <Container
                maxWidth={"xs"}
            >
                <Stack justifyContent={"center"} direction={"row"}>
                    <Typography variant={"h5"} component={"header"}>
                        Modify Personal Information
                    </Typography>
                </Stack>

                <form noValidate autoComplete="off">
                    <TextField
                        disabled = {true}
                        defaultValue={newUserName}
                        label={"Username"}
                        variant={"outlined"}
                        fullWidth
                        required
                        helperText={nameErrorDes}
                        margin={"normal"}
                    />
                    <TextField
                        onChange={(e) => setNewEmail(e.target.value)}
                        defaultValue={newEmail}
                        label={"New Email"}
                        variant={"outlined"}
                        multiline
                        fullWidth
                        row={4}
                        required
                        margin={"normal"}
                    />
                    <TextField
                        onChange={(e) => setNewAddress(e.target.value)}
                        defaultValue={newAddress}
                        label={"New Address"}
                        variant={"outlined"}
                        required
                        fullWidth
                        margin={"normal"}
                    />

                    <Stack
                        direction={"row"}
                        justifyContent={"flex-end"}
                        className={classes.button}
                    >
                        <Link href="/password" variant="body2">
                            {"Modify Password"}
                        </Link>
                    </Stack>

                    <Stack
                        justifyContent={"space-between"}
                        direction={"row"}
                        className={classes.button}
                    >
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={backToLogin}
                        >
                            BACK
                        </Button>

                        <Button
                            type="submit"
                            variant={"contained"}
                            endIcon={<PublishIcon/>}
                            color={"primary"}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Stack>
                </form>

            </Container>
            <br/>
        </Paper>
        </Container>
    );
}

export default UserSetting;