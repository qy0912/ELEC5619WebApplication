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
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, styled } from "@mui/styles";

let data = [
  { user: "Dolars", msg: "hello", is_img: false },
  { user: "Me", msg: "hi", is_img: false },
  { user: "Dolars", msg: "hello", is_img: false },
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
            {input.msg.is_img ? (
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {input.msg.user[0]}
          </Avatar>
        </Stack>
      )}
    </Box>
  );
};

export default function ChatBox() {
  const classes = useStyles();
  // const [file, setFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);
  const [msgs, setMsgs] = useState(data);
  const ImageInput = useRef(null);
  const messagesEnd = useRef(null);
  useEffect(() => {
    if (messagesEnd && messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text]);
  const onFileChange = (event) => {
    // setFile(event.target.files[0]);
    // setImageUrl(URL.createObjectURL(event.target.files[0]));
    let body = {
      user: "Me",
      msg: null,
      is_img: true,
      img: URL.createObjectURL(event.target.files[0]),
    };
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
    };
    msgs.push(body);

    let detail = axios
      .post("/api/dolars/classification", { words: text })
      .then((res) => {
        console.log(res);
      });

    text = "";
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
