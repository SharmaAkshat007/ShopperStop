import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Address } from "../types/address";

interface AddressTileProps {
  addresses: Array<Address>;
}

export function AddressTile(props: AddressTileProps) {
  const { addresses } = props;

  return (
    <>
      <Typography sx={{ marginBottom: "1rem" }} variant="h6" gutterBottom>
        Saved Addresses
      </Typography>

      {addresses.map((address) => {
        return (
          <div key={address.id} style={{ display: "flex" }}>
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
            <Button size="small" color="primary" variant="contained">
              Next
            </Button>
          </div>
        );
      })}

      <Typography
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        variant="h6"
        gutterBottom
      >
        Or
      </Typography>
    </>
  );
}
