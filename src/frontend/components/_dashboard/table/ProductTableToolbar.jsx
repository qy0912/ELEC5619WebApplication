import {makeStyles} from "@mui/styles";
import {lighten} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import React from "react";
import UseToolbarStyles from "./UseToolbarStyles";


const ProductTableToolbar = (props) => {
    const classes = UseToolbarStyles();
    const { numSelected, onDelete, filterName, onFilterName} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (

                <Box
                    className={classes.box}
                    borderColor={"primary"}
                >
                    <TextField
                        variant={"outlined"}
                        size={"small"}
                        placeholder="Search products..."
                        value={filterName}
                        onChange={onFilterName}
                        InputProps={{
                            "data-testid": "search",
                            startAdornment: <InputAdornment position="start"><SearchIcon color={"primary"}/></InputAdornment>,
                        }}
                    />
                </Box>

            )}

            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        onClick={onDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

ProductTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default ProductTableToolbar;