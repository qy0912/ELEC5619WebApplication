import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";

const useStyles = makeStyles((theme) => ({
    icon: {
        [theme.breakpoints.up('sm')]:{
            display: "none",
        },
    },
}))


function MoreVertPopover() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const menuItems = [
        {
            text: 'Home',
            icon: <HomeIcon style={{color: "#586A57"}}/>,
            path: '/'
        },
        {
            text: 'Shopping',
            icon: <StoreIcon style={{color: "#586A57"}}/>,
            path: '/shopping?category=5&order=1'
        }
    ]

    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;

    return(
        <div className={classes.icon}>
            <IconButton
                onClick={handleOpen}
                aria-describedby={id}
            >
                <MoreVertIcon style={{color: "white"}}/>
            </IconButton>

            <Popover
                id={id}
                open={open}
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
            >
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => {
                                navigate(item.path)
                                handleClose()
                            }}
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>

            </Popover>
        </div>
    )
}


export default MoreVertPopover