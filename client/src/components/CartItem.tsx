import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Cart } from "../types/cart";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { primary, secondary, tertiary } from "../utils/color";
import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
import { useDebounce } from "../utils/useDebounce";

interface CartItemProps {
  item: Cart;
  idx: number;
  cart: Array<Cart>;
  setCart: Dispatch<SetStateAction<Array<Cart>>>;
}

export default function CartItem(props: CartItemProps) {
  const { item, cart, setCart, idx } = props;

  const [count, setCount] = useState(item.quantity);

  const updateCart = async () => {
    const access_token = await getAccessToken();
    const product_id = item.id;
    await axios.put(
      `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/update`,
      {
        product_id: product_id,
        quantity: count + 1,
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const deleteCart = async () => {
    const access_token = await getAccessToken();
    const product_id = item.id;

    await axios.delete(
      `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/delete/${product_id}`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const debouncedUpdateCart = useDebounce(updateCart, 1000);

  const handleDecrease = async () => {
    try {
      if (count > 1) {
        const newCart = [...cart];
        newCart[idx].quantity = count - 1;
        setCart(newCart);
        setCount(count - 1);
        await debouncedUpdateCart();
      }

      if (count - 1 === 0) {
        const newCart = cart.filter((item, index) => !(index === idx));
        setCart(newCart);
        setCount(0);
        await deleteCart();
      }
    } catch (err) {}
  };

  const handleIncrease = async () => {
    try {
      const newCart = [...cart];
      newCart[idx].quantity = count + 1;
      setCart(newCart);
      setCount(count + 1);
      await debouncedUpdateCart();
    } catch (err) {}
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", backgroundColor: secondary }}>
          <Typography
            sx={{ color: primary, marginBottom: "1rem" }}
            component="div"
            variant="h5"
          >
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ color: primary }}
          >
            {"Price : " + item.price + " ₹"}
          </Typography>
        </CardContent>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton sx={{ color: primary }} onClick={handleDecrease}>
            <RemoveIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ color: primary }}
          >
            {count}
          </Typography>
          <IconButton sx={{ color: primary }} onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <CardMedia component="img" sx={{ width: 151 }} image={item.image_path} />
    </Card>
  );
}
