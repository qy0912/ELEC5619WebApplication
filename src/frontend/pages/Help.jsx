 
import cookieMan from '../cookieManager';
import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography
} from "@mui/material";
import Footer from "../components/Footer";
import styled from "styled-components";



const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

function clickMe() {
  alert("You clicked me!");
}

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

const Tab = styled.button`
  font-size: 1em;
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;


var dict = {
  "Add Transactions/Income":"At a new conversation with Dolars, to add transaction or income you may type in the chatbox 'Add transactions,source,amount,category' or 'Add income,source,amount' ",
  "List all Transaction/Income":"At a new conversation with Dolars, to see recent Transactions or Income, you may simply use phrase like 'show me my income','I want to see my transactions' ", 
  "Financial Summary":"To check your financial summary, simply use any phrase relate to 'Financial summary', such as 'I want to see my summary', Dolars will provide with you a button to the detailed financial summary page",
  "Budget Planning":"To use budget planning, you may type phrase relate to 'Planning', Dolars will provide you in text with how much could be spent on each catogory based on your past income and transaction history.",
  "Receipt Scanning":"Receipt scanning function can take receipt photos as input, automatically recogonize the information from it, generate a transaction and add transaction to the database. To use this function. simple click on the image button next to textbox. Dolars will provide with the added information."
};


function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <div>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <Typography style={{margin: "20px 0px", fontFamily: "sans-serif"}} variant={"h7"}>
        {dict[active]}
      </Typography>
    </>
  );
}

const types = ["Add Transactions/Income", "List all Transaction/Income", "Financial Summary","Budget Planning","Receipt Scanning"];

function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <ButtonToggle active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}

      


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
        <Typography style={{margin: "20px 0px", fontFamily: "sans-serif",fontSize:"large"}} variant={"h7"}>
          Dolar is a new concept of financial management system. It's not like a
          machine, but more like your personal housekeeper. Just a few click and
          have a chat with Dolar, it will help you to record your expense and income,
          analysis your financial status, also provide professional suggestions/plan
          to your budget.
          <br/>
          <br/>


          Please select the following tab for support of the related function.<br/><br/>
        </Typography>
    </div>

    <TabGroup />


    <br/>
    <br/>


    </Container>
    
    
    <Footer/>
    </div>
    
  );
}
