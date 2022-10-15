import {useEffect, useState} from 'react';
import {
    Button,
    Container,
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup, Stack,
    TextField,
} from "@mui/material";
import PublishIcon from "@mui/icons-material//Publish";
import cookieMan from '../cookieManager';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop: theme.spacing(20)
    },
    icon: {
        paddingTop: theme.spacing(2)
    },
    text: {
        padding: theme.spacing(1)
    }
}))

function Setpreference() {
    const [meat, setMeat] = useState(1)
    const [vegetable, setVegetable] = useState(1)
    const [fruit, setFruit] = useState(1)
    const [diary, setDiary] = useState(1)
    const navigate = useNavigate();
    const classes = useStyles();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let currentUser;
    useEffect( () => {
        currentUser = cookieMan.loginUser();
        tempp();
        if (currentUser === undefined) {
            navigate("/login")
        }
    }, [])

    let mm = ''

    const tempp = () => {
        axios.post('/api/user/findpre', {username:currentUser})
        .then(res => {
            mm = res.data.meat
            if (mm === undefined) {
                mm = '1111'
            }
            setMeat(Number(mm[0]))
            setVegetable(Number(mm[1]))
            setFruit(Number(mm[2]))
            setDiary(Number(mm[3]))
        })
    }


    const meatstate = (e) => {
        if (meat === 1) {
            setMeat(0)
        } else {
            setMeat(1)
        }
    }

    const vegetablestate = (e) => {
        if (vegetable === 1) {
            setVegetable(0)
        } else {
            setVegetable(1)
        }
    }

    const fruitstate = (e) => {
        if (fruit === 1) {
            setFruit(0)
        } else {setFruit(1)}
    }

    const diarystate = (e) => {
        if (diary === 1) {
            setDiary(0)
        } else {
            setDiary(1)}
    }

    const returnBack = (e) => {
        navigate("/shopping?category=5&order=1")
    }
 
    const handleUpdate = (e) => {
        e.preventDefault()
        currentUser = cookieMan.loginUser();
        const newInfo = {
            username: currentUser,
            meat: meat,
            vegetable: vegetable,
            fruit: fruit,
            diary: diary
        }
        const temp = {
            username: 'AbortController',
            password: 'avc'
        }
        if (currentUser !== undefined) {
            axios.post('/api/user/modifypre', newInfo)
            .then(res => {
                if(res.data.status === "UserUpdated"){
                    var truthBeTold = window.confirm("Update successfully! Do you want to go to the shopping page?");
                    if (truthBeTold) {
                        navigate("/shopping?category=5&order=1")
                    }
                }else if(res.data.status === "Invalid"){
                    alert("Failed!");
                }
            })
        }
        
    }

    return (
            <Container className={classes.root} maxWidth={"xs"} >
                <form noValidate autoComplete="off">

                    <FormGroup>
                    <Typography variant="caption" display="block" gutterBottom className={classes.text}>
                        You can manage you preference here and click "SAVE" after changing!
                    </Typography>

                    <FormControlLabel control={<Switch checked={meat} />} label="Provide meat for me" 
                        onChange={()=>{console.log("meat"); meatstate()}}/>

                    <Typography variant="caption" display="block" gutterBottom className={classes.text}>
                        After select this choice, meat will show in the shop.
                    </Typography>

                    <FormControlLabel control={<Switch checked={vegetable} />} label="Provide vegetables for me" 
                        onChange={()=>{console.log("vegetable"); vegetablestate()}}/>
                    <Typography variant="caption" display="block" gutterBottom className={classes.text}>
                        After select this choice, vegetables will show in the shop.
                    </Typography>
            
                    <FormControlLabel control={<Switch checked={fruit} />} label="Provide fruits for me" 
                        onChange={()=>{console.log("fruit"); fruitstate()}}/>
                    <Typography variant="caption" display="block" gutterBottom className={classes.text}>
                        After select this choice, fruits will show in the shop.
                    </Typography>
                
                    <FormControlLabel control={<Switch checked={diary} />} label="Provide diary for me" 
                        onChange={()=>{console.log("diary"); diarystate()}}/>
                    <Typography variant="caption" display="block" gutterBottom className={classes.text}>
                        After select this choice, dinary will show in the shop.
                    </Typography>
                    </FormGroup>

                    <Stack
                        justifyContent={"space-between"}
                        direction="row"
                        className={classes.icon}
                    >
                        <Button
                            type="submit"
                            color={"primary"}
                            onClick={returnBack}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant={"contained"}
                            endIcon={<PublishIcon/>}
                            color={"primary"}
                            onClick={(e) => handleUpdate(e)}
                        >
                            Save
                        </Button>
                    </Stack>
                </form>
            </Container>
    );
}

export default Setpreference;