import {
  Stack,
  Paper,
  Card,
  Typography,
  Box,
  Avatar,
  TextField,
  IconButton,
  List,
  linkClasses,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, styled } from "@mui/styles";
import { useHref, useNavigate } from "react-router-dom";
import { stringify } from "uuid";

let data = [
  { user: "Dolars", msg: "hello", is_img: false, is_url: false },
  { user: "Me", msg: "hi", is_img: false, is_url: false },
  { user: "Dolars", msg: "hello", is_img: false, is_url: false },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "20%",
    marginTop: "10%",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    width: "60%",
    height: "100%",
  },
  icon: {
    paddingTop: theme.spacing(2),
  },

  msg_dolars: {
    marginTop: "2%",
    marginLeft: "1%",
    marginRight: "60%",
  },
  msg_me: {
    marginTop: "2%",
    marginLeft: "60%",
    marginRight: "20%",
  },
  msg_me_word: {
    paddingLeft: "0%",
    paddingRight: "0%",
  },
  msg_dolars_word: {
    paddingLeft: "0%",
    paddingRight: "0%",
  },
  msg_stack: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  textbox: {
    minWidth: 140,
    maxWidth: 140,
  },
}));
const Img = styled("img")({
  top: 0,
  width: "80%",
  height: "80%",
  maxHeight: 400,
  objectFit: "cover",
  position: "flex",
});

const MsgCard = (input) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Box>
      {input.msg.user == "Dolars" ? (
        <Stack direction="row" spacing={3}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {input.msg.user[0]}
          </Avatar>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {input.msg.user}
            </Typography>
            {input.msg.is_url ? (
              <IconButton
                url={input.msg.url}
                onClick={() => {
                  navigate(input.msg.url);
                }}
              >
                {" "}
                Here is your financial summary report{" "}
              </IconButton>
            ) : input.msg.is_img ? (
              <img src={input.msg.img} />
            ) : (
              <Typography variant="body1">{input.msg.msg}</Typography>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" spacing={3}>
          <Stack className={classes.textbox}>
            <Typography variant="body2" color="text.secondary">
              {input.msg.user}
            </Typography>
            {input.msg.is_img ? (
              <img src={input.msg.img} />
            ) : (
              <Typography variant="body1">{input.msg.msg}</Typography>
            )}
          </Stack>
          <Avatar src={localStorage.getItem("avatar")} aria-label="recipe">
            {input.msg.user[0]}
          </Avatar>
        </Stack>
      )}
    </Box>
  );
};

export default function ChatBox() {
  const navigate = useNavigate();
  const classes = useStyles();
  // const [file, setFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(localStorage.getItem("chathistory"));
  const ImageInput = useRef(null);
  const messagesEnd = useRef(null);
  const [respond, setR] = useState(false);
  useEffect(() => {
    if (messagesEnd && messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text, msgs]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (respond) {
        setMsgs(msgs.slice(0));
        setR(false);
        if (messagesEnd && messagesEnd.current) {
          messagesEnd.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  const onFileChange = (event) => {
    // setFile(event.target.files[0]);
    // setImageUrl(URL.createObjectURL(event.target.files[0]));
    let body = {
      user: "Me",
      msg: null,
      is_url: false,
      is_img: true,
      img: URL.createObjectURL(event.target.files[0]),
    };
    //external API
    console.log("The file to be sent is:", event.target.files[0]);
    // 将图像发送到后端，使用 fetch 或者 axios 都行
    const FormData = require("form-data");
    const data = new FormData();
    data.append("file", event.target.files[0]);

    const options = {
      method: "POST",
      url: "https://image-to-base64.p.rapidapi.com/imgtob64",
      headers: {
        "X-RapidAPI-Key": "8fa618dfaemshcc72d37d2642c5ep1277f8jsn5b46ad4f8d02",
        "X-RapidAPI-Host": "image-to-base64.p.rapidapi.com",
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("image base64 is: ");
        console.log(response.data);

        let data = { url: "data:image/png;base64," + response.data };

        axios
          .post("/api/img/recImg", data)
          .then((res) => {
            let result = res.data.message.split(" ");
            let dolarBody = {
              user: "Dolars",
              msg: "You have use " + result[0] + " dolars on " + result[1],
              is_img: false,
              is_url: false,
            };
            msgs.push(dolarBody);
            setR(true);
            console.log(res);
          })
          .catch((err) => {
            console.log(err.data);
          });
      })
      .catch(function (error) {
        console.error(error);
      });

    msgs.push(body);
    ImageInput.current.value = "";
    setMsgs(msgs);
  };

  const handlePush = (event) => {
    if (text.length < 1) {
      return;
    }
    setText("");
    let body = {
      user: "Me",
      msg: text,
      is_img: false,
      is_url: false,
    };
    msgs.push(body);

    let detail = axios
      .post(
        "/api/dolars/classification",
        { words: text },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        let cat = res.data.response[0];
        let body = {
          user: "Dolars",
          msg: undefined,
          is_img: false,
          is_url: false,
        };
        if (cat === "add transaction") {
          body.msg =
            "Please provide your transaction information(type, data, paied)";
        } else if (cat === "add income") {
          body.msg =
            "Please provide your income information(type, data, paied)";
        } else if (cat === "payment type") {
          body.msg = "Here is your information about payment type";
        } else if (cat === "budget plan") {
          body.msg = "Here is your budget plan ";
          // navigate('/dashboard')
        } else if (cat === "my transactions") {
          body.msg = "There are your transactions";
        } else if (cat === "my incomes") {
          body.msg = "Income is here:";
        } else if (cat === "Unrecognized") {
          body.msg = "I can not understand you, I am just a bot";
        } else if (cat === "financial report") {
          body.msg = "Here is your budget plan ";
          body.url = "/dashboard";
          body.is_url = true;
        }
        msgs.push(body);
        setR(true);
      });
    setText("");
    setMsgs(msgs);
    // messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Paper className={classes.root}>
      <Stack spacing={3} className={classes.msg_stack}>
        <Box sx={{ minHeight: 300, maxHeight: 300, overflow: "auto" }}>
          {msgs.map((item, index) => {
            let x = item.user == "Dolars" ? classes.msg_dolars : classes.msg_me;
            return (
              <Box key={index} className={x}>
                <MsgCard msg={item} />
              </Box>
            );
          })}
          <div ref={messagesEnd}></div>
        </Box>
        <Stack direction="row">
          <TextField
            id="standard-basic"
            label="Type your message here"
            placeholder="Let's say something"
            size="small"
            inputProps={{ maxLength: 254 }}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            style={{ width: "100%" }}
          />
          <input
            ref={ImageInput}
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            onChange={onFileChange}
            hidden
          />
          <IconButton
            onClick={() => {
              ImageInput.current.click();
            }}
            aria-label="reply"
            size="small"
          >
            <ImageIcon />
          </IconButton>

          <IconButton size="small" onClick={handlePush}>
            <Typography variant={"button"}>Push</Typography>
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
