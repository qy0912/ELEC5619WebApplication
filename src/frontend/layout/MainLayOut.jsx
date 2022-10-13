import React, {useEffect, useState} from 'react';
import {Link as ReactLink, Outlet, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import {Box, Breadcrumbs, IconButton} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import StoreIcon from "@mui/icons-material/Store";
import AccountPopover from "../components/AccountPopover";
import "../css/landing.css";
import Link from "@mui/material/Link";
import cookieMan from '../cookieManager';
import MoreVertPopover from "../components/MoreVertPopover";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpeedIcon from '@mui/icons-material/Speed';
import Typography from 'material-ui/styles/typography';

const useStyles = makeStyles((theme) =>{
    return {
        root: {
          display: 'flex',
        },
        appBar: {
            backgroundColor: '#E0DAA8',
            display: 'block',
        },
        toolbar: {
            display: "flex",
            justifyContent:"space-between",
        },

        link: {
            display: 'flex',
            color: "#fff",
            fontSize: 15,
            fontWeight: "bold",
        },

        button:{
            margin: 1
        },
        bottom: {
            position: 'absolute',
            width: '600px',
            height: '0px',
            left: 'center',
            top: '80%',
            color:'#000000'
        },
        bottomButton:{
            position: 'static',
            fontSize: 18,
            color: '#fff'
        },

        logoLg:{
            display: "none",
            [theme.breakpoints.up("sm")]:{
                display: "block",
            }
        },
        logo:{
            maxWidth: 150,
            maxHeight: 60

        },
        icons: {
            display: 'flex',
            marginRight: theme.spacing(0.5),
        },
        mainContent:{
            marginTop: 150
        }
    }
})

export default function MainLayOut() {
    const classes = useStyles()
    const navigate = useNavigate();
    const [isProvider, setProvider] = useState(false);

    useEffect(()=>{
        setProvider(cookieMan.getType() === "provider");
    })

   return (
       <div className={classes.root}>
           <AppBar
               elevation={0}
               className={classes.appBar}
               position={"fixed"}
               color={"primary"}
           >
                <Toolbar className={classes.toolbar}>
                    <Box>
                        <Link
                        >
                            <img
                                className={classes.logo}
                                src="/assets/logoSmall.png"
                                alt="logo Image"
                                sx={{
                                    cursor:'pointer'
                                }}
                                onClick={e => navigate('/')}
                            >
                            </img>
                        </Link>
                    </Box>

                    <div className={classes.icons}>
                        <MoreVertPopover />
                        {cookieMan.getType() === 'customer' &&
                            <div>
                                <IconButton
                                    className={classes.button}
                                    component={ReactLink}
                                    to={"/shoppingCart"}
                                >
                                    <ShoppingCartIcon style={{color: "white"}}/>
                                </IconButton>
                            </div>
                        }

                        {(cookieMan.getType() === 'provider' ||
                         cookieMan.getType() === 'admin') &&
                        
                            <div>
                                <IconButton
                                    className={classes.button}
                                    component={ReactLink}
                                    to={"/dashboard"}
                                >
                                    <SpeedIcon style={{color: "white"}}/>
                                </IconButton>
                            </div>
                        }

                        <AccountPopover />
                    </div>
                </Toolbar>
           </AppBar>

           {/* main content */}
           <Outlet />
       </div>
   )
}