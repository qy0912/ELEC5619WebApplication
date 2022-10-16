import styled from 'styled-components'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { sliderItems } from '../../data';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import cookie from 'react-cookies'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  padding-top: 63px;
  @media only screen and (max-width:380px){
    display: none;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  color: #${(props) => props.titleColor};
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;



const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate();
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    const handleClickButton = () => {
      if (cookie.load('userInfo')===undefined ||cookie.load('userInfo')===null ){
        navigate("/login")
      }
      else{
        navigate("/chatbox")
      }
  };


    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <KeyboardArrowLeftOutlinedIcon />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImageContainer
                            sx = {{
                              marginTop: 5,
                              marginBottom: 4,
                              height: "100px",
                              width: '30px',
                            }} >
                            <Image src={item.img}
                            width={920}
                            sx = {{
                              marginTop: 5,
                              marginBottom: 4,
                              height: "100px",
                              width: '30px',
                            }}/>
                        </ImageContainer>
                        <InfoContainer>
                            <Title titleColor={item.titleColor}>{item.title}</Title>
                            <Typography sx={{
                              marginTop: 5,
                              marginBottom: 4,
                              color: '#' + item.titleColor,
                              fontSize: '1.4vw',
                              fontWeight: '300',
                              letterSpacing: '1.5px'
                            }}>{item.desc}</Typography>
                            <Button variant='outlined' onClick={() => handleClickButton()}
                              sx={{
                                borderColor: '#' + item.titleColor,
                                color: '#' + item.titleColor
                              }}
                            >Start Your Journey</Button>
                        </InfoContainer>
                    </Slide>

                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <KeyboardArrowRightOutlinedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider;