import React from 'react';
import {Box, Button, Card, Grid, Typography} from "@mui/material";
// import AddIcon from '@mui/icons-material//Add';
import {makeStyles} from "@mui/styles";
import ProductTable from "./table/ProductTable";
import {Paper} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    header:{
        marginBottom: 20,
    },
}))

function Product(){
    const classes = useStyles();
    return (
        <ProductTable/>
    )
}

export default Product