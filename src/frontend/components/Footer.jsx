import {styled} from "@mui/styles";
import React from "react";
import {Typography} from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import {useNavigate} from "react-router-dom";

const Container = styled('div')(({theme}) => ({
    display: "flex",
    backgroundColor: '#586A57',
    left: 0,
    bottom: 0,
    width: '100vw',
    [theme.breakpoints.down("md")]:{
        flexDirection: "column"
    }
}))

const Left = styled('div')(({theme}) => ({
   flex: 1,
   display: "flex",
   flexDirection: "column",
   padding: "20px",
}))

const LogoImg = styled('img')({
    width: 150,
    height: 75,
})

const Middle = styled('div')(({theme}) => ({
    flex: 1,
    padding: "20px",
    [theme.breakpoints.down("md")]:{
        display: "none"
    }
}))

const Right = styled('div')(({theme}) => ({
    flex: 1,
    padding: "20px"
}))

const List = styled('ul')(({theme}) => ({
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap"
}))

const ListItem = styled('li')(({theme}) => ({
    width: "50%",
    marginBottom: "10px",
    color: "white",
    cursor: "pointer"
}))

const ContactItem = styled('div')(({theme})=> ({
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    color: "white"
}))

const Footer = () => {
    const navigate = useNavigate();
    return(
        <Container>
            <Left>
                <LogoImg
                    style = {{width:"30%", height: "30%"}}
                    src="/assets/icon.png"
                    alt="logo Image"
                >
                </LogoImg>
                <Typography style={{margin: "20px 0px", color: "white"}} variant={"h7"}>
                    Dolar is a new concept of financial management system. It's not like a
                    machine, but more like your personal housekeeper. Just a few click and
                    have a chat with Dolar, it will help you to record your expense and income,
                    analysis your financial status, also provide professional suggestions/plan 
                    to your budget.
                </Typography>
            </Left>

            <Middle>
                <Typography variant={"h4"} style={{marginTop: "3%", marginBottom: "5%", color: "white"}}>
                    Useful Links
                </Typography>

                <List>
                    <ListItem onClick={()=> navigate("/")} >Home</ListItem>
                    <ListItem onClick={()=> {
                         if (localStorage.getItem("token") === null) {
                            navigate("/login")
                          }
                          else{navigate("/chatbox")}}
                        }>Start Chat</ListItem>
                    <ListItem onClick={()=> navigate("/setting")} >My Account</ListItem>
                    <ListItem onClick={()=> navigate("/")} >History</ListItem>
                    <ListItem onClick={()=> navigate("/help")}>Help</ListItem>
                    <ListItem onClick={()=> {
                         if (localStorage.getItem("token") === null) {
                            navigate("/login")
                          }
                          else{navigate("/dashboard")}}
                        }>My Dashboard</ListItem>
                </List>
            </Middle>

            <Right>
                <Typography variant={"h4"} style={{marginTop: "3%",marginBottom: "5%", color: "white"}}>
                    Contact
                </Typography>
                <ContactItem>
                    <BusinessIcon style={{marginRight: "10px"}}/>
                    <Typography variant={"h7"}>
                        City of Sydney, New South Wales, 2000
                    </Typography>
                </ContactItem>

                <ContactItem>
                    <PhoneIphoneIcon style={{marginRight: "10px"}}/>
                    <Typography variant={"h7"}>
                        +61 0415294388
                    </Typography>
                </ContactItem>

                <ContactItem>
                    <EmailIcon style={{marginRight: "10px"}}/>
                    <Typography variant={"h7"}>
                        planyourday@gmail.com
                    </Typography>
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer;