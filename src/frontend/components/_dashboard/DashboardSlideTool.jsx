import React from 'react';
import {Container, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import LocalMallIcon from '@mui/icons-material//LocalMall';
import BarChartIcon from '@mui/icons-material//BarChart';
import {useNavigate} from "react-router-dom";
import AddRounded from '@mui/icons-material//AddRounded'
import {makeStyles} from "@mui/styles";
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import { alpha, useTheme, styled } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import cookieMan from '../../cookieManager';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import AdminIssue from '../Issueview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useStyles = makeStyles((theme, active) => ({
    root: {
        paddingTop: theme.spacing(7),
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },
    text: {
        color: "#586A57",
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    icon: {
        color: 'blue'
    }
}))

const DashboardSlideTool = () => {
    const theme = useTheme()
    const loc = useLocation()
    const navigate = useNavigate();
    const classes = useStyles(theme);
    
    const selectedBtnStyle = {
        bgcolor: '#97b597',
        '&:before': { display: 'block' }
    }

    const selectedTextStyle = {
        color: 'white'
    }

    const selectedIconStyle = {
        color: 'white'
    }

    const menuItems = [
        {
            text: 'Statistics',
            icon: <BarChartIcon sx={{...(loc.pathname==='/dashboard' && (selectedIconStyle))}}></BarChartIcon>,
            path: '/dashboard',
            accType: 'provider',
        },
        {
            text: 'Products',
            icon: <LocalMallIcon sx={{...(loc.pathname==='/dashboard/product' &&selectedIconStyle)}}/>,
            path: '/dashboard/product',
            accType: 'provider',
        },
        {
            text: 'Add Product',
            icon: <AddRounded sx={{...(loc.pathname==='/dashboard/addProduct' &&selectedIconStyle)}}/>,
            path: '/dashboard/addProduct',
            accType: 'provider',
        },
        {
            text: 'Statistics',
            icon: <BarChartIcon sx={{...(loc.pathname==='/dashboard' && (selectedIconStyle))}}></BarChartIcon>,
            path: '/dashboard',
            accType: 'admin',
        },
        {
            text: 'Products',
            icon: <LocalMallIcon sx={{...(loc.pathname==='/dashboard/product' &&selectedIconStyle)}}/>,
            path: '/dashboard/product',
            accType: 'admin',
        },
        {
            text: 'Add Product',
            icon: <AddRounded sx={{...(loc.pathname==='/dashboard/addProduct' &&selectedIconStyle)}}/>,
            path: '/dashboard/addProduct',
            accType: 'admin',
        },
        {
            text: 'Users',
            icon: <GroupIcon sx={{...(loc.pathname==='/dashboard/users' &&selectedIconStyle)}}/>,
            path: '/dashboard/users',
            accType: 'admin',
        },
        {
            text: 'Create Admin',
            icon: <GroupAddIcon sx={{...(loc.pathname==='/dashboard/users' &&selectedIconStyle)}}/>,
            path: '/dashboard/addAdmin',
            accType: 'super',
        },
        {
            text: 'Issues',
            icon: <ErrorOutlineIcon sx={{...(loc.pathname==='/dashboard/issues' &&selectedIconStyle)}}/>,
            path: '/dashboard/issues',
            accType: 'admin',
        },
        {
            text: 'Transactions',
            icon: <AccessTimeIcon sx={{...(loc.pathname==='/dashboard/transaction' && selectedIconStyle)}}/>,
            path: '/dashboard/transaction',
            accType: 'admin',
        },
    ]
    
    return (
        <div className={classes.root}>
            <List>
                {menuItems.map(item => (
                    <>
                        {(cookieMan.getType() === item.accType|| 
                        (cookieMan.loginUser() === 'super' && item.accType === 'super'
                        ))&&  
                            <ListItem
                            button
                            key={item.text}
                            className={classes.MuiListItem}
                            onClick={ () => navigate(item.path)}
                            sx={{
                                ...((item.path === loc.pathname) && selectedBtnStyle),
                                '&:hover': {
                                    backgroundColor: '#daeada'
                                },
                                '&:focus': {
                                    backgroundColor: '#97b597'
                                }
                            }}
                        >
                            <ListItemIcon
                            >        
                            {item.icon}   
                            </ListItemIcon>
                            <ListItemText className={classes.text} primary={item.text}
                                sx ={{
                                    ...((item.path === loc.pathname) && selectedTextStyle)
                                }}
                            />

                        </ListItem>
                    }
                    </>
                ))}

            </List>
        </div>
    )
}

export default DashboardSlideTool