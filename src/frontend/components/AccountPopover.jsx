import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography,
  Popover, Avatar
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import cookieMan from "../cookieManager";
import { useNavigate } from 'react-router-dom';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SpeedIcon from '@mui/icons-material/Speed';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const AccountPopover = () => {

    const navigate = useNavigate();
    const accountType = cookieMan.getType()
    const [anchorEl, setAnchorEl] = useState(null);
    const avatar = localStorage.getItem("avatar") === null ?
        "/assets/ava_icon.png" :
        localStorage.getItem("avatar");

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        cookieMan.logout();
        localStorage.clear()

        if (window.location.pathname==='/'){
            window.location.reload();
        }
        else{
            navigate('/')
        }
        
        handleClose();
       
    }

    const redirectToSettingPage = () => {
        if (cookieMan.loginUser !== undefined) {
            navigate("/setting");
        }else{
            navigate("/login");
        }
        handleClose();
    }

    const redirectToLoginPage = () => {
        navigate("/login");
        handleClose();
    }

    const redirectToPreferencePage = () => {
        if (cookieMan.loginUser !== undefined) {
            navigate("/preference");
        }else{
            navigate("/login");
        }
        handleClose();
    }
    const redirectToOrderPage = () => {
        
        if (cookieMan.loginUser() !== undefined) {
            navigate("/order");
        }else{
            navigate("/login");
        }
        handleClose();
    }
    const redirectToReportPage = () => {
        
        if (cookieMan.loginUser() !== undefined) {
            navigate("/report");
        }else{
            navigate("/login");
        }
        handleClose();
    }

    const redirectToDashboardPage = () => {
        if(cookieMan.loginUser() !== undefined) {
            navigate("/dashboard");
        } else {
            navigate("/login")
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;

    return (
        <div style={{display: 'inline'}} ref={React.createRef()}>
            <IconButton
                ref={React.createRef()} 
                onClick={handleOpen}
                aria-describedby={id}
                color="inherit"
            >
              <Avatar src={avatar} />
            </IconButton>
            
            <Popover
                ref={React.createRef()}
                open={open}
                id={id}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ 
                    vertical: 'bottom', 
                    horizontal: 'center' 
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        width: 200
                    }
                }}
            >
                <Box sx={{my:1.5, px: 2.5}}>
                    {cookieMan.loginUser() === undefined ?
                        (<Typography variant={"subtitle1"}>
                            Welcome !
                        </Typography>)
                        :
                        (<Typography variant={"subtitle1"}>
                            {cookieMan.loginUser()}
                        </Typography>)
                    }
                </Box>

                <Divider sx={{ my: 1}} />
                <Box sx={{
                    mr: 2,
                    width: 24,
                    height: 18
                }}/>
                <MenuItem onClick={redirectToSettingPage}>
                <PersonIcon color={"primary"}/>
                <Box sx={{
                    mr: 2,
                    width: 24,
                    eight: 24
                }}/>
                    Profile
                </MenuItem>
                <br/>

                {accountType === 'customer' &&
                    <div>
                        <MenuItem onClick={redirectToPreferencePage}>
                        <SettingsIcon color={"primary"}/>
                        <Box sx={{
                            mr: 2,
                            width: 24,
                            height: 24
                        }}/>
                            Settings
                        </MenuItem>
                        <br/>
                    </div>
                }   
                {accountType === 'customer' &&
                    <div>
                        <MenuItem onClick={redirectToOrderPage }>
                        <DeliveryDiningIcon color={"primary"}/>
                        <Box sx={{
                            mr: 2,
                            width: 24,
                            height: 24
                        }}/>
                        My Order
                        </MenuItem>
                        <br/>
                    </div>
                }
                {accountType === 'customer' &&
                    <div>
                        <MenuItem onClick={redirectToReportPage }>
                        <AssignmentLateIcon color={"primary"}/>
                        <Box sx={{
                            mr: 2,
                            width: 24,
                            height: 24
                        }}/>
                        Report
                        </MenuItem>
                        <br/>
                    </div>
                }

                <Box sx={{p:2, pt: 1.5}}>
                    {cookieMan.loginUser() === undefined ?
                        (<Button 
                            fullWidth
                            color={"primary"}
                            variant={"outlined"}
                            onClick={redirectToLoginPage}
                        >
                            Log In
                        </Button>)
                        :
                        (<Button
                            fullWidth
                            color={"primary"}
                            variant={"outlined"}
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>)
                    }
                </Box>

            </Popover>
        </div>
    )
}


export default AccountPopover