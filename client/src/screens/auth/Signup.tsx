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

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      error === errors.noError
    ) {
      console.log({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        error: error,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
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
                control={<Checkbox value="show" color="primary" />}
                label="Show Password"
                onClick={handleShowPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
