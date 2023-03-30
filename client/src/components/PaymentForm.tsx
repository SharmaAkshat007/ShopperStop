import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { primary } from "../utils/color";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
