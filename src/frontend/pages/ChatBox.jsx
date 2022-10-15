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

import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";

let data = [
  { user: "Dolars", msg: "hello", is_img: false },
  { user: "Me", msg: "hi", is_img: false },
  { user: "Dolars", msg: "hello", is_img: false },
  { user: "Dolars", msg: "hello", is_img: false },
  { user: "Dolars", msg: "hello", is_img: false },
  { user: "Dolars", msg: "hello", is_img: false },
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
    paddingLeft: "0%",
    paddingRight: "60%",
  },
  msg_me: {
    marginTop: "2%",
    paddingLeft: "60%",
    paddingRight: "0%",
  },
  msg_me_word: {
    paddingLeft: "60%",
    paddingRight: "0%",
  },
  msg_dolars_word: {
    paddingLeft: "60%",
    paddingRight: "0%",
  },
  msg_stack: {
    marginLeft: "5%",
    marginRight: "5%",
  },
}));
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
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.msg_dolars}
            >
              {input.msg.user}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.msg_dolars}
            >
              {input.msg.msg}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" spacing={3}>
          <Stack className={classes.msg_me}>
            <Typography variant="body2" color="text.secondary">
              {input.msg.user}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {input.msg.msg}
            </Typography>
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
  let msgs = data;
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const ImageInput = useRef(null);
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    ImageInput.current.value = "";
  };
  const handlePush = () => {
    if (text.length < 1) {
      return;
    }
    setText("");
    let body = {
      user: "me",
      text: text,
      is_img: false,
    };
  };
  return (
    <Paper className={classes.root}>
      <Stack spacing={3} className={classes.msg_stack}>
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {msgs.map((item, index) => {
            let x = item.user == "Dolars" ? classes.msg_dolars : classes.msg_me;
            return (
              <Box key={index} className={x}>
                <MsgCard msg={item} />
              </Box>
            );
          })}
        </List>
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
