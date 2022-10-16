import React,{useState,useEffect} from "react";
import {makeStyles, styled} from "@mui/styles";
import {Button, Paper, Stack,Divider,Typography, Container, Box,MenuItem,TextField,InputAdornment} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import cookieMan from "../cookieManager";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const useStyles = makeStyles((theme) => {
    return {
        root:{
            display: "flex",
            width: '100%',
            marginTop: theme.spacing(10)
        },
        paper:{
            marginBottom: theme.spacing(3)
        },
        content: {
            marginRight: theme.spacing(10)
        },
        inside: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3)
        },
        avatar: {
            height: '50px',
            width: '50px',
            borderRadius: '50%'
        },
        details: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(5)
        },
        searchBox:{
            marginBottom: theme.spacing(5)
        },
    }

})

const IssueCard = (data) => {
    const classes = useStyles()
    let username = data.username
    let content = data.description
    let id = data.id
    let title = data.title
    let category = data.category
    const [status, setStatus] = React.useState(data.status);

    useEffect(() => {setStatus(data.status)}, [data.status]);
    return (
        <Paper className={classes.paper} variant="outlined">
            <div className={classes.inside}>
            <Stack divider={<Divider flexItem />} spacing={1}>
                <div>
                    <Typography variant={'subtitle2'}>
                            Issue Id: {id}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                            Title: {title}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                            Reporter: {username}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                            Category: {category}
                    </Typography>
                </div>
                <Typography variant={'text'}>
                    {content}
                </Typography>
                {
                    status === "waiting"
                    ?
                    (
                        <Typography variant={'subtitle2'}   >
                            Status: Waiting
                        </Typography>
                    ) 
                    : status === "reject" ? (
                        <Typography variant={'subtitle2'} sx={ {color:"#ff384f" }}>
                            Status: Reject
                        </Typography>
                    ) : (
                        <Typography variant={'subtitle2'} sx={ {color:"#97B597" }}>
                            Status: Resolved
                        </Typography>
                    ) 
                }
            </Stack>
            </div>
        </Paper>
    )
}



const IssueView = ()=>{
    const navigate = useNavigate();
    const classes = useStyles()
    const [issues, setIssues] = React.useState([]);
    const [targetstatus, setTargetstatus] = React.useState("all");
    const [searchId, setSearchId] = React.useState("");
    
    const refresh = () =>{
        axios.post("/api/issues/getbyReporter",{reporter:cookieMan.loginUser()}).
        then((res) => {
                setIssues(res.data)
            }
        ).catch(err => console.log(err));
    }
    const searchById = (searchKey) =>{
        setSearchId(searchKey)
    }
    const handleChange = (event) => {
        setTargetstatus(event.target.value);
    }
    useEffect(() => {refresh()}, []);
    return (
        <Container className={classes.root}>
            <Box className={classes.searchBox}>
                <Stack direction="row" spacing={2}>
                    <div>
                        <Button variant="outlined" onClick={()=>{navigate("/addReport");}}
                            sx={{height: 56, width: 'auto'}}
                        >  
                            Report
                        </Button> 
                    </div>
                    <TextField
                        fullWidth
                        id="filled-search"
                        label="Enter the target Id"
                        type="search"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchById(e.target.value);
                            }
                        }}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    < SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        style={{
                            marginBottom: 30,
                            top: 0,
                            backgroundColor: 'transparent',
                        }}
                    />
                </Stack>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={targetstatus}
                        label="Select status"
                        onChange={handleChange}
                    >
                    <MenuItem value={"all"}>All Issue</MenuItem>
                    <MenuItem value={"waiting"}>Unsolved Issue</MenuItem>
                    <MenuItem value={"resolved"}>Solved Issue</MenuItem>
                    <MenuItem value={"reject"}>Rejected Issue</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {
                issues.filter(issue=>{
                    return (searchId === "" && (issue.status===targetstatus || targetstatus==="all")) || (searchId === issue._id)
                }).map((issue,index)=>{
                    return (
                        <IssueCard key={index+"-issuecard"} username={issue.reporter} description={issue.description} status={issue.status} id={issue._id} title={issue.title} category={issue.category}/>
                    )
                })
            }
        </Container>
    )

}

export default IssueView;

