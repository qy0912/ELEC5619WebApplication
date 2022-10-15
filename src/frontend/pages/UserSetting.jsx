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
   // const [newEmail, setNewEmail] = useState(cookieMan.getEmail())
 //   const [newAddress, setNewAddress] = useState(cookieMan.getAddress())
    const [oldUserName, setOldUserName] = useState(cookieMan.loginUser())
   // const [oldEmail, setOldEmail] = useState(cookieMan.getEmail())
   // const [oldAddress, setOldAddress] = useState(cookieMan.getAddress())
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
        navigate("/dashboard");
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

        if (oldUserName !== undefined ) {
            if (newUserName !== 'undefined' && newUserName !== ''){
                const newInfo = {
                    newUserName: newUserName,
                    currentUserName: oldUserName
                }
                axios.put('/api/user/modify', newInfo,
                    {headers: {'Authorization': localStorage.getItem("token")}})
                .then(res => {
                    if(res.data.status === "UserUpdated"){
                        setMsg("Modify Successfully! ");
                        setSeverity('success');
                        setOpen(true);
                        const Type = cookieMan.getType()
                        cookieMan.logout();
                        cookieMan.onLogin(newUserName);

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
                        Upload Avatar
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

                  <Stack justifyContent={"center"} direction={"row"}>
                    <Button variant="contained" component="label">
                      Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  </Stack>

                </form>

            </Container>
            <br/>
            <br/>
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
                    defaultValue={newUserName}
                    label={"Username"}
                    variant={"outlined"}
                    fullWidth
                    required
                    helperText={nameErrorDes}
                    margin={"normal"}
                />

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