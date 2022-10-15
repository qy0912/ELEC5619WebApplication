import axios from "axios";
import cookieMan from "../cookieManager";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link,
  Avatar,
  Alert,
  Snackbar,
  Paper,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(15),
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  const login = (username, password) => {
    let data = { username: username, password: password };
    console.log(111);
    axios
      .post("/api/user/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem(
            "token",
            res.data.tokenType + " " + res.data.accessToken
          );
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("gender", res.data.gender);
          localStorage.setItem("avatar", res.data.avatar);
          localStorage.setItem("theme", res.data.theme);
          // navigate("/dashboard");
          // window.location.reload();
        }
      })
      .catch((err) => {
        setOpenAlert(true);
        setMessage("Username and Password does not match !");
        console.log(err.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Container className={classes.root} maxWidth={"xs"}>
      <Paper maxWidth={"xs"}>
        <Container>
          <Collapse in={openAlert}>
            <Alert
              data-testid="account-login-message"
              severity={"error"}
              action={
                <IconButton
                  arial-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {message}
            </Alert>
          </Collapse>

          <CssBaseline />
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                margin: 10,
                backgroundColor: "transparent",
              }}
            >
              <LockIcon
                style={{
                  color: "#586A57",
                }}
              />
            </Avatar>

            <Typography variant={"h5"} component={"h1"}>
              Sign In
            </Typography>

            <form>
              <TextField
                id="name"
                variant={"outlined"}
                type="text"
                fullWidth
                label="Username"
                margin={"normal"}
                required
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
                inputProps={{ "data-testid": "account-login-username" }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                id="pwd"
                variant={"outlined"}
                type="password"
                label="Password"
                fullWidth
                margin={"normal"}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                inputProps={{ "data-testid": "account-login-password" }}
                InputLabelProps={{ shrink: true }}
              />
            </form>

            <Button
              data-testid="account-login-submit"
              style={{
                marginTop: 20,
                marginBottom: 15,
              }}
              fullWidth
              color={"primary"}
              variant={"contained"}
              onClick={() => {
                login(username, password);
              }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/findpassword" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
        <br />
      </Paper>
    </Container>
  );
};

export default Login;
