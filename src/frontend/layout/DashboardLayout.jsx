import React, {useEffect} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import {Outlet, useNavigate} from 'react-router-dom';
import cookieMan from '../cookieManager';
import {Paper} from '@mui/material'

export default function DashboardLayout(){
    const navigate = useNavigate();
    // const classes = useStyles();

    useEffect( () => {
        if(cookieMan.getType() === "provider" || cookieMan.getType() === "admin"){
            //go into dashboard
        }else{
            navigate("/dashboard");
        }
    }, [])

    return (
        <Grid container>
            

            {/* Middle Part */}
            <Grid item xs={10} sm={10} md={20} lg={20} sx={{backgroundColor: '#97B597'}}>
                <Paper
                    sx={{
                        margin: '5%',
                        marginLeft: '7%',
                        marginRight: '7%',
                        marginTop: '10%',
                        padding: '2%',
                        paddingTop: '4%'
                    }}
                >
                <Outlet/>
                </Paper>
            </Grid>
        </Grid>
    )
}