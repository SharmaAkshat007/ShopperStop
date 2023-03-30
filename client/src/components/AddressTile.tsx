import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Address } from "../types/address";
import { primary } from "../utils/color";
import getAccessToken from "../utils/getAccessToken";

interface AddressTileProps {
  addresses: Array<Address>;
  setAddress1: Dispatch<SetStateAction<string>>;
  setAddress2: Dispatch<SetStateAction<string>>;
  setMobile: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<string>>;
  setPin: Dispatch<SetStateAction<string>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setAddressId: Dispatch<SetStateAction<string>>;
}

export function AddressTile(props: AddressTileProps) {
  const {
    addresses,
    setAddress1,
    setAddress2,
    setMobile,
    setCity,
    setState,
    setPin,
    activeStep,
    setActiveStep,
    setAddressId,
  } = props;

  const handleAddressSubmit = async (event: any) => {
    const idx = parseInt(event.target.id);
    setAddress1(addresses[idx].address_line1);
    setAddress2(addresses[idx].address_line2);
    setMobile(addresses[idx].mobile_no);
    setCity(addresses[idx].city);
    setState(addresses[idx].state);
    setPin(addresses[idx].pin_code);
    setAddressId(addresses[idx].id);
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: "1rem", color: primary }}
        variant="h6"
        gutterBottom
      >
        Saved Addresses
      </Typography>

      {addresses.map((address, idx) => {
        return (
          <div
            key={address.id}
            style={{ display: "flex", marginBottom: "1rem" }}
          >
            <Typography>
              {address.address_line1 +
                " " +
                address.address_line2 +
                " " +
                address.city +
                " " +
                address.state +
                " " +
                address.pin_code +
                " " +
                address.mobile_no}
            </Typography>
            <Button
              id={idx.toString()}
              sx={{
                borderRadius: "50%",
                backgroundColor: primary,
                "&:hover": { backgroundColor: primary },
              }}
              size="small"
              disableElevation={true}
              variant="contained"
              onClick={handleAddressSubmit}
            >
              Next
            </Button>
          </div>
        );
      })}

      <Typography
        sx={{ marginTop: "1rem", marginBottom: "1rem", color: primary }}
        variant="h6"
        gutterBottom
      >
        Or
      </Typography>
    </>
  );
}
