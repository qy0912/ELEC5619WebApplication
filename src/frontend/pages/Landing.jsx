import React from 'react';
import '../css/landing.css'
import Footer from "../components/Footer";
import Slider from "../components/landing/Slider";
import {styled} from "@mui/styles";
import Category from "../components/landing/Category";

const Container = styled('div')(({
    width: '100%'
}))

function Landing(){
    return (
        <Container>
            <Slider />
            <Category />
            <Footer />
        </Container>

    )
}

export default Landing