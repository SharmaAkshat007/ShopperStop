import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";
import { useState } from "react";
import errors from "../../utils/error";
import {
  checkEmailError,
  checkPasswordError,
  emailHelper,
} from "../../utils/sharedFunctions";
import { Link as RouterLink, useHistory } from "react-router-dom";
import ErrorBanner from "../../components/ErrorBanner";
import axios from "axios";
import { getUser, setUser } from "../../utils/localStorage";
import { User } from "../../types/user";
import { Role } from "../../enum";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [reqError, setReqError] = useState<string>("");
  const [role, setRole] = useState<Array<boolean>>([false, false]);

  const history = useHistory();

  const handleBuyer = () => {
    if (role[0] === true && role[1] === false) {
      const change = [false, false];
      setRole(change);
    } else if (role[0] === false && role[1] === true) {
      const change = [true, false];
      setRole(change);
    } else if (role[0] === false && role[1] === false) {
      const change = [true, false];
      setRole(change);
    }
  };

  const handleSeller = () => {
    if (role[0] === true && role[1] === false) {
      const change = [false, true];
      setRole(change);
    } else if (role[0] === false && role[1] === true) {
      const change = [false, false];
      setRole(change);
    } else if (role[0] === false && role[1] === false) {
      const change = [false, true];
      setRole(change);
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (event: any) => {
    emailHelper(event, setError, setEmail);
  };

  const handlePasswordChange = (event: any) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length === 0) {
      setError(errors.emptyPassword);
    } else {
      setError(errors.noError);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      email.length !== 0 &&
      password.length !== 0 &&
      error === errors.noError &&
      !(role[0] === false && role[1] === false)
    ) {
      // console.log({
      //   email: email,
      //   password: password,
      //   error: error,
      // });
      let userRole: string = "";
      try {
        if (role[0] === true) {
          userRole = "buyer";
        } else if (role[1] === true) {
          userRole = "seller";
        }

        const res = await axios.post(
          `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/auth/login`,
          {
            email: email,
            password: password,
            role: userRole,
          }
        );

        const currUser: User = {
          firstName: res.data.data[0].firstName,
          lastName: res.data.data[0].lastName,
          email: res.data.data[0].email,
          role: userRole,
          accessToken: res.data.data[0].access_token,
          refreshToken: res.data.data[0].refresh_token,
        };

        setUser(currUser);
        setReqError("");
        if (userRole === Role.BUYER) {
          history.push("/home");
        } else if (userRole === Role.SELLER) {
          history.push("/admin");
        }
      } catch (err: any) {
        const message: string = err.response.data.message;
        setReqError(message);
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {reqError.length !== 0 ? <ErrorBanner message={reqError} /> : <></>}
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={checkEmailError(error)}
            helperText={checkEmailError(error) ? error : ""}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            error={checkPasswordError(error)}
            helperText={checkPasswordError(error) ? error : ""}
            onChange={handlePasswordChange}
          />

          <FormControlLabel
            control={
              <Checkbox checked={role[0]} value="show" color="primary" />
            }
            label="Buyer *"
            onClick={handleBuyer}
          />
          <FormControlLabel
            control={
              <Checkbox checked={role[1]} value="show" color="primary" />
            }
            label="Seller *"
            onClick={handleSeller}
          />
          <br />
          <FormControlLabel
            control={<Checkbox value="show" color="primary" />}
            label="Show Password"
            onClick={handleShowPassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/signup">
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
