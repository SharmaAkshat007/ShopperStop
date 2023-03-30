import { Button, Container, Drawer, Table, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import { Cart } from "../types/cart";
import { primary } from "../utils/color";
import getAccessToken from "../utils/getAccessToken";
import CartItem from "./CartItem";

interface SideDrawerCartProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cart: Array<Cart>;
  setCart: Dispatch<SetStateAction<Array<Cart>>>;
}

export function SideDrawerCart(props: SideDrawerCartProps) {
  const { open, setOpen, cart, setCart } = props;
  const history = useHistory();

  const handleCart = async () => {
    try {
      const access_token: string = await getAccessToken();

      const res = await Promise.all(
        cart.map(async (item) => {
          await fetch(
            `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify({
                product_id: item.id,
                quantity: item.quantity,
              }),
            }
          );
        })
      );

      history.push({
        pathname: "/checkout",
        state: {
          cart: cart,
        },
      });
    } catch (err) {}
  };

  const totalPrice = (): number => {
    let price = 0;

    cart.forEach((item) => {
      price += item.price * item.quantity;
    });

    return price;
  };

  const price = totalPrice();
  const gst = price * 0.18;
  const grandTotal = price + gst;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        {cart.map((item, idx) => {
          return (
            <CartItem
              key={item.id}
              idx={idx}
              item={item}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
      </Container>
      {cart.length > 0 ? (
        <Container>
          <Table sx={{ marginBottom: "2rem" }}>
            <tbody>
              <tr>
                <th>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    Total Price
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    {price}
                  </Typography>
                </td>
              </tr>
              <tr>
                <th>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    GST (18%)
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    {gst}
                  </Typography>
                </td>
              </tr>
              <tr>
                <th>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    Grand Total
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: primary }}
                  >
                    {grandTotal}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </Table>

          <Button
            variant="contained"
            sx={{
              width: "100%",
              mb: "2rem",
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
            onClick={handleCart}
            disableElevation={true}
          >
            Buy
          </Button>
        </Container>
      ) : (
        <></>
      )}
    </Drawer>
  );
}
