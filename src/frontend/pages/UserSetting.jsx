import React, {useEffect, useState} from 'react';
import {
  Button,
  Container, Link, Stack,
  TextField,
  Paper, FormControl, InputLabel, MenuItem, Avatar
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Select from '@mui/material/Select';
 
const useStyles = makeStyles((theme)=> ({
    root: {
        paddingTop: theme.spacing(20)
    },
    button: {
        margin: theme.spacing(1)
    }
}))

function UserSetting() {
    const oldUserName = localStorage.getItem("username")
    const [newUserName, setNewUserName] = useState(localStorage.getItem("username"))
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('success')
    const [nameError, setNameError] = useState(false)
    const [nameErrorDes, setNameErrorDes] = useState('Change user name will be required to re-login')
    const [gender, setGender] = useState(localStorage.getItem("gender"))
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"))

    const navigate = useNavigate();
    const classes = useStyles();
    
    useEffect( () => {
        if (oldUserName === null) {
            navigate("/login")
        }}, []);

    const backToLogin = (e) => {
        e.preventDefault()
        navigate("/dashboard");
    }

    const handleGenderChange = (event) => {
      setGender(event.target.value);
    }

    const handleThemeChange = (event) => {
      setTheme(event.target.value);
    }

    const handleUserNameChange = (event) => {
      setNewUserName(event.target.value);
      if(event.target.value === null || event.target.value=== '') {
        ReportNameError(true)
      } else {
        ReportNameError(false)
      }
    }

    const validateAll = () => {
        if(newUserName === '' || newUserName === undefined) {
            setNameError(true)
            setNameErrorDes('User name cannot be empty')
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

    const handleAvatarChange = (event) => {
      let formData = new FormData();
      formData.append("avatar", event.target.files[0])
      axios.post("/api/user/avatar", formData,
          {headers: {'Authorization': localStorage.getItem("token"), "Content-Type": "multipart/form-data"}})
      .then(res => {
        if (res.data.success === true) {
          let new_avatar = res.data.result
          localStorage.setItem("avatar", new_avatar)
          setAvatar(new_avatar)
        }
      })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (newUserName !== 'undefined' && newUserName !== ''){
            const newInfo = {
                username: newUserName,
                gender: gender,
                theme: theme
            }
            axios.put('/api/user/modify', newInfo,
                {headers: {'Authorization': localStorage.getItem("token")}})
            .then(res => {
                if(res.data.success === true){
                    setMsg("Modify Successfully! ");
                    setSeverity('success');
                    setOpen(true);
                    if (newUserName !== oldUserName) {
                      localStorage.clear();
                      navigate("/login");
                    }
                    localStorage.setItem("gender", gender)
                    localStorage.setItem("theme", theme)
                }else {
                    setMsg(res.data.message);
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
              <br/>
                <Stack justifyContent={"center"} direction={"row"}>
                    <Typography variant={"h5"} component={"header"}>
                      Modify Personal Information
                    </Typography>
                </Stack>

              <br/>

              <form noValidate autoComplete="off">
                  <Stack justifyContent={"center"} direction={"row"}>
                    <Avatar src={avatar} sx={{ width: 100, height: 100 }}/>
                  </Stack>

                  <br/>

                  <Stack justifyContent={"center"} direction={"row"}>
                    <Button variant="contained" component="label" >
                      Upload
                      <input hidden multiple type="file" accept="image/*"
                             onChange={(event)=> {
                               handleAvatarChange(event)
                             }}
                             onClick={(event)=> {
                               event.target.value = null
                             }}
                      />
                    </Button>
                  </Stack>

                </form>

            </Container>
            <br/>
            <Container
                maxWidth={"xs"}
            >

              <form noValidate autoComplete="off">
                <TextField
                    defaultValue={newUserName}
                    label={"Username"}
                    variant={"outlined"}
                    fullWidth
                    required
                    helperText={nameErrorDes}
                    margin={"normal"}
                    onChange={handleUserNameChange}
                />
                <br/>
                <br/>

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      variant={"outlined"}
                      margin={"normal"}
                      value={gender}

                      required
                      label="Gender"
                      onChange={handleGenderChange}
                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Not to say</MenuItem>
                  </Select>
                </FormControl>

                <br/>
                <br/>

                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      variant={"outlined"}
                      margin={"normal"}
                      value={theme}
                      required
                      label="Theme"
                      onChange={handleThemeChange}
                  >
                    <MenuItem value={"LIGHT"}>Light</MenuItem>
                    <MenuItem value={"DARK"}>Dark</MenuItem>
                    <MenuItem value={"YELLOW"}>Yellow</MenuItem>
                    <MenuItem value={"BLUE"}>Blue</MenuItem>
                  </Select>
                </FormControl>

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