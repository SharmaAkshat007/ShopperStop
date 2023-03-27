import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Cart } from "../types/cart";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, SetStateAction, useState } from "react";

interface CartItemProps {
  item: Cart;
  idx: number;
  cart: Array<Cart>;
  setCart: Dispatch<SetStateAction<Array<Cart>>>;
}

export default function CartItem(props: CartItemProps) {
  const { item, cart, setCart, idx } = props;

  const [count, setCount] = useState(item.quantity);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {"Price : " + item.price * count + " ₹"}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            onClick={() => {
              if (count > 1) {
                const newCart = [...cart];
                newCart[idx].quantity = count - 1;
                setCart(newCart);
                setCount(count - 1);
              }

              if (count - 1 === 0) {
                const newCart = cart.filter((item, index) => !(index === idx));
                setCart(newCart);
                setCount(0);
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {count}
          </Typography>
          <IconButton
            onClick={() => {
              const newCart = [...cart];
              newCart[idx].quantity = count + 1;
              setCart(newCart);
              setCount(count + 1);
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <CardMedia component="img" sx={{ width: 151 }} image={item.image_path} />
    </Card>
  );
}
