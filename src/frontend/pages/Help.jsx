 
import cookieMan from '../cookieManager';
import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography
} from "@mui/material";
import Footer from "../components/Footer";


export default function Help(){

  return (  
    <div>
    <Container sx = {{paddingRight:30, paddingTop:20, paddingBottom:15}}>

    <div style={{ marginTop: 20}}>
      <Typography style={{margin: "20px 0px", fontFamily: "cursive"}} variant={"h3"}>
        Help
      </Typography>
    </div>

    <div style={{ marginTop: 20}}>
        <Typography style={{margin: "20px 0px", fontFamily: "sans-serif"}} variant={"h7"}>
          Dolar is a new concept of financial management system. It's not like a
          machine, but more like your personal housekeeper. Just a few click and
          have a chat with Dolar, it will help you to record your expense and income,
          analysis your financial status, also provide professional suggestions/plan
          to your budget.
        </Typography>
    </div>

    <div style={{ marginTop: 20}}>
      <Typography style={{margin: "20px 0px", fontFamily: "sans-serif"}} variant={"h7"}>
        Dolar is a new concept of financial management system. It's not like a
        machine, but more like your personal housekeeper. Just a few click and
        have a chat with Dolar, it will help you to record your expense and income,
        analysis your financial status, also provide professional suggestions/plan
        to your budget.
      </Typography>
    </div>

    <br/>
    <br/>


    </Container>
    
    
    <Footer/>
    </div>
    
  );
}
