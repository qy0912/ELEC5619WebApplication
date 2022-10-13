import styled from "styled-components";
import { categories } from "../../data";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  padding-bottom: 10%;
  @media only screen and (max-width:380px){
    flex-direction: column;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
`;


const SubContainer = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media only screen and (max-width:380px){
    height: 20vh;
  }
`;

const Title = styled.h1`
    color: #${(props) => props.titleColor};
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const useStyles = makeStyles((theme) => ({
    subTitle: {
        [theme.breakpoints.down("md")]: {
            paddingTop: "20%"
        }
    }
}))

const Category = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    return (
        <div>
            <Stack
                className={classes.subTitle}
                direction={"row"}
                justifyContent={"center"}
            >
                <Title titleColor={"586A57"}>Category</Title>
            </Stack>

            <Container>
                {categories.map((item) => (
                    <SubContainer key={item.id}>
                        <Image src={item.img} />
                        <Info>
                            <Title titleColor={"FFFFFF"}> {item.title} </Title>
                            <Button onClick={() => navigate("/shopping?"+"category="+item.id+"&order=1")}>SHOP NOW</Button>
                        </Info>
                    </SubContainer>
                ))}
            </Container>
        </div>
    )
}

export default Category;