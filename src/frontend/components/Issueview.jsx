import React,{useState,useEffect} from "react";
import {makeStyles, styled} from "@mui/styles";
import {Avatar,Button, Paper, Stack,Divider,Typography, Container, Box, MenuItem,TextField,InputAdornment} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useStyles = makeStyles((theme) => {
    return {
        con:{
            display: "flex",
            width: '100%',
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
        }
        
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
    const [msg, setmsg] = useState('');

    useEffect(() => {setStatus(data.status)}, [data.status]);
    const statusChange = (id,change) => {
        sendFeedback(change)
        axios.post("/api/issues/changeStatus", {id:id, change:change}).
            then((res) => {
                    if(res.data==="success"){
                        setStatus(change);
                    }
                }
        ).catch(err => console.log(err.data));
    }

    const handleChangemsg = (event) => {
        setmsg(event.target.value);
    }

    const sendFeedback = (stat) => {
     
        axios.post("/api/email/sendFeedback", {username:username, msg:msg, issueStatus:stat, id:id, des:content}).
            then((res) => {
                    if(res.data==="success"){
                        
                    }
                }
        ).catch(err => console.log(err.data));
    }
    return (
        <Paper sx={{marginTop: '2%'}} variant="outlined">
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
                    <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                        <TextField id="standard-basic" label="Feedback Text" variant="standard" onChange={(e)=>{handleChangemsg(e)}}/>   
                        <Stack direction="row"  divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                        <Button color="primary" variant="outlined" onClick={()=>{statusChange(id,"resolved")}} startIcon={<DoneIcon />} >Resolved</Button>
                        <Button color="primary" variant="outlined" onClick={()=>{statusChange(id,"reject")}} startIcon={<DoNotDisturbIcon />}>Reject</Button>
                        </Stack>
                    </Stack>
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
    const classes = useStyles()
    const [issues, setIssues] = React.useState([]);
    const [targetstatus, setTargetstatus] = React.useState("all");
    const [searchId, setSearchId] = React.useState("");
    const refresh = () =>{
        axios.get("/api/issues/getAll").
        then((res) => {
                setIssues(res.data)
            }
        ).catch(err => console.log(err.data));
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
            <Avatar
                style={{
                    margin: 10,
                    marginLeft:'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent'
                }}
            >
                <ErrorOutlineIcon
                    style={{
                        color: "#586A57"
                    }}
                />
            </Avatar>
            <Typography variant={"h5"} component={"h1"} sx={{color:'#586A57',paddingBottom:'5%', textAlign:'center'}}>
                Manage Issues
            </Typography>
            <Box className={classes.searchBox}>
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

