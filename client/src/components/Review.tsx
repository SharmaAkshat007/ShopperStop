import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Cart } from "../types/cart";

interface ReviewInterface {
  cart: Array<Cart>;
  addressId: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pin: string;
  mobile: string;
}

export default function Review(props: ReviewInterface) {
  const { cart, addressId, address1, address2, city, state, pin, mobile } =
    props;

  const totalPrice = () => {
    let price = 0;
    cart.map((item) => {
      price += item.price;
    });
    return price;
  };
  let price = totalPrice();
  let pricegst = price + price * 0.18;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} />
            <Typography variant="body2">{item.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{}}>
            {price}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="GST" />
          <Typography variant="subtitle1" sx={{}}>
            {price * 0.18}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {pricegst}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>

          <Typography gutterBottom>
            {address1 +
              " " +
              address2 +
              " " +
              city +
              " " +
              " " +
              state +
              " " +
              pin +
              " " +
              mobile}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
