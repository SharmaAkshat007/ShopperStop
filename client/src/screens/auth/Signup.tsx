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
  isValidPassword,
} from "../../utils/sharedFunctions";
import { Link as RouterLink, useHistory } from "react-router-dom";
import ErrorBanner from "../../components/ErrorBanner";
import axios from "axios";
import { primary } from "../../utils/color";

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [reqError, setReqError] = useState<string>("");

  const history = useHistory();

  const checkFirstNameError = (): boolean => {
    return error === errors.firstNameEmpty;
  };

  const checkLastNameError = (): boolean => {
    return error === errors.lastNameEmpty;
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleFirstNameChange = (event: any) => {
    const value = event.target.value;
    setFirstName(value);
    if (value.length === 0) {
      setError(errors.firstNameEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handleLastNameChange = (event: any) => {
    const value = event.target.value;
    setLastName(value);
    if (value.length === 0) {
      setError(errors.lastNameEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handleEmailChange = (event: any) => {
    emailHelper(event, setError, setEmail);
  };

  const handlePasswordChange = (event: any) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length === 0) {
      setError(errors.emptyPassword);
    } else if (!isValidPassword(value)) {
      setError(errors.invalidPassword);
    } else {
      setError(errors.noError);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      error === errors.noError
    ) {
      // console.log({
      //   firstName: firstName,
      //   lastName: lastName,
      //   email: email,
      //   password: password,
      //   error: error,
      // });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/auth/signup`,
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          }
        );
        setReqError("");
        history.push("/signin");
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
        <Typography sx={{ color: primary }} component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: primary,
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: primary,
                    },
                  },
                }}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={checkFirstNameError()}
                helperText={checkFirstNameError() ? error : ""}
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: primary,
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: primary,
                    },
                  },
                }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={checkLastNameError()}
                helperText={checkLastNameError() ? error : ""}
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: primary,
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: primary,
                    },
                  },
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={checkEmailError(error)}
                helperText={checkEmailError(error) ? error : ""}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: primary,
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: primary,
                    },
                  },
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                error={checkPasswordError(error)}
                helperText={checkPasswordError(error) ? error : ""}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="show" style={{ color: primary }} />}
                label="Show Password"
                onClick={handleShowPassword}
                style={{ color: primary }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation={true}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <RouterLink to="/signin">
                <Link
                  sx={{ color: primary, textDecorationLine: "none" }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
