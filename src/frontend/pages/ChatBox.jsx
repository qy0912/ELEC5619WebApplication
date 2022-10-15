import {
  Stack,
  Paper,
  Card,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { red } from "@mui/material/colors";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

let data = [
  { user: "Dolars", msg: "hello" },
  { user: "Me", msg: "hi" },
];
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
  },
  icon: {
    paddingTop: theme.spacing(2),
  },

  msg_dolars: {
    paddingLeft: theme.spacing(3),
  },
  msg_me: {
    paddingLeft: theme.spacing(3),
    textAlign: "left",
  },
  msg_card: {
    paddingLeft: theme.spacing(4),
    width: 300,
    height: 300,
  },
}));
const MsgCard = (input) => {
  const classes = useStyles();
  return (
    <Card>
      {input.msg.user == "Dolars" ? (
        <Stack direction="row">
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
        <Stack direction="row">
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {input.msg.user[0]}
          </Avatar>
        </Stack>
      )}
    </Card>
  );
};

export default function ChatBox() {
  const classes = useStyles();
  let msgs = data;
  return (
    <Container className={classes.root}>
      <Paper>
        <Stack spacing={2}>
          {msgs.map((item, index) => {
            return (
              <MsgCard msg={item} key={index} className={classes.msg_card} />
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
}
