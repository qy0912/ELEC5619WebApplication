import UseToolbarStyles from "../_dashboard/table/UseToolbarStyles";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import cookieMan from "../../cookieManager";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import React from "react";

const ShoppingCartTableToolbar = (props) => {
    const {numSelected, onDelete, getAndSetShoppingCart, selected, setLoading} = props;
    const classes = UseToolbarStyles();
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle" component="div">
                    Shopping Cart
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip  title= "Delete" >
                    <IconButton id="delete-product" aria-label="delete" onClick={()=>{
                        setLoading(true)
                        let username = cookieMan.loginUser();
                        let data = {username:username,products: selected};
                        axios.post('/api/shoppingCart/delete', data)
                            .then(res => {
                                onDelete()
                                getAndSetShoppingCart();
                            })
                            .catch(err => console.log(err.data));
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

ShoppingCartTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

export default ShoppingCartTableToolbar