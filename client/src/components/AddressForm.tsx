import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Address } from "../types/address";
import { AddressTile } from "./AddressTile";
import { Dispatch, SetStateAction, useState } from "react";
import errors from "../utils/error";
import { primary } from "../utils/color";

interface AddressFormProps {
  addresses: Array<Address>;
  setAddress1: Dispatch<SetStateAction<string>>;
  setAddress2: Dispatch<SetStateAction<string>>;
  setMobile: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<string>>;
  setPin: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  error: string;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setAddressId: Dispatch<SetStateAction<string>>;
}

export default function AddressForm(props: AddressFormProps) {
  const [reqError, setReqError] = useState<string>("");

  const {
    addresses,
    setAddress1,
    setAddress2,
    setMobile,
    setCity,
    setState,
    setError,
    setPin,
    error,
    activeStep,
    setActiveStep,
    setAddressId,
  } = props;

  const handleAddress1Change = (event: any) => {
    const value = event.target.value;
    setAddress1(value);
    if (value.length === 0) {
      setError(errors.address1Empty);
    } else {
      setError(errors.noError);
    }
  };

  const handleAddress2Change = (event: any) => {
    const value = event.target.value;
    setAddress2(value);
    if (value.length === 0) {
      setError(errors.address2Empty);
    } else {
      setError(errors.noError);
    }
  };

  const handleMobileChange = (event: any) => {
    const value = event.target.value;
    setMobile(value);
    if (value.length === 0) {
      setError(errors.mobileEmpty);
    } else if (value.length > 10 || isNaN(parseInt(value))) {
      setError(errors.mobileNotValid);
    } else if (value.length > 0 && value.length < 10) {
      setError(errors.mobileNotValid);
    } else {
      setError(errors.noError);
    }
  };

  const handleCityChange = (event: any) => {
    const value = event.target.value;
    setCity(value);
    if (value.length === 0) {
      setError(errors.cityEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handleStateChange = (event: any) => {
    const value = event.target.value;
    setState(value);
    if (value.length === 0) {
      setError(errors.stateEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handlePinCode = (event: any) => {
    const value = event.target.value;
    setPin(value);
    if (value.length === 0) {
      setError(errors.pinCodeEmpty);
    } else if (value.length > 0 && value.length < 6) {
      setError(errors.pinNotValid);
    } else if (value.length > 6 || isNaN(parseInt(value))) {
      setError(errors.pinNotValid);
    } else {
      setError(errors.noError);
    }
  };

  return (
    <>
      {addresses.length > 0 ? (
        <AddressTile
          addresses={addresses}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setMobile={setMobile}
          setCity={setCity}
          setState={setState}
          setPin={setPin}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setAddressId={setAddressId}
        />
      ) : (
        <></>
      )}
      <Typography sx={{ color: primary }} variant="h6" gutterBottom>
        New Address
      </Typography>
      <Grid container spacing={3}>
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
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            error={error === errors.address1Empty}
            helperText={error === errors.address1Empty ? error : ""}
            onChange={handleAddress1Change}
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
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            error={error === errors.address2Empty}
            helperText={error === errors.address2Empty ? error : ""}
            onChange={handleAddress2Change}
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
            id="mobile"
            name="mobile"
            label="Mobile No."
            fullWidth
            autoComplete="mobile"
            variant="standard"
            error={
              error === errors.mobileEmpty || error === errors.mobileNotValid
            }
            helperText={
              error === errors.mobileEmpty || error === errors.mobileNotValid
                ? error
                : ""
            }
            onChange={handleMobileChange}
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
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            error={error === errors.cityEmpty}
            helperText={error === errors.cityEmpty ? error : ""}
            onChange={handleCityChange}
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
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            error={error === errors.stateEmpty}
            helperText={error === errors.stateEmpty ? error : ""}
            onChange={handleStateChange}
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
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            error={
              error === errors.pinCodeEmpty || error === errors.pinNotValid
            }
            helperText={
              error === errors.pinCodeEmpty || error === errors.pinNotValid
                ? error
                : ""
            }
            onChange={handlePinCode}
          />
        </Grid>
      </Grid>
    </>
  );
}
