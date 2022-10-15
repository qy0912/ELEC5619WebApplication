import React from 'react';
import '../css/landing.css'
import Footer from "../components/Footer";
import Slider from "../components/landing/Slider";
import {styled} from "@mui/styles";

const Container = styled('div')(({
    width: '100%'
}))

function Landing(){
    return (
        <Container>
            <Slider />
            <Footer />
        </Container>

    )
}

export default Landing