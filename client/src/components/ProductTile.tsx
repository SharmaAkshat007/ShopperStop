import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import { ProductSeller } from "../types/product";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Dispatch, SetStateAction, useState } from "react";
import { Cart } from "../types/cart";
import { primary, secondary, tertiary } from "../utils/color";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import { useDebounce } from "../utils/useDebounce";

interface ProductTileProps {
  key: string;
  product: ProductSeller;
  cart: Array<Cart>;
  setCart: Dispatch<SetStateAction<Array<Cart>>>;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductTile(props: ProductTileProps) {
  const [expanded, setExpanded] = useState(false);
  const { product, cart, setCart } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addCart = async (quantity: number, product_id: string) => {
    const access_token = await getAccessToken();

    await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/add`,
      {
        product_id: product_id,
        quantity: 1,
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const updateCart = async (quantity: number, product_id: string) => {
    const access_token = await getAccessToken();

    await axios.put(
      `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/update`,
      {
        product_id: product_id,
        quantity: quantity,
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const deboucedAddCart = useDebounce(addCart, 1000);
  const debouncedUpdateCart = useDebounce(updateCart, 1000);

  const handleAddCart = async () => {
    let idx = -1;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        idx = i;
        break;
      }
    }
    try {
      if (idx === -1) {
        await deboucedAddCart(1, product.id);
        setCart([
          ...cart,
          {
            id: product.id,
            name: product.name,
            description: product.description,
            quantity: 1,
            price: product.price,
            image_path: product.image_path,
          },
        ]);
      } else {
        const newCart = [...cart];
        await debouncedUpdateCart(newCart[idx].quantity + 1, newCart[idx].id);
        newCart[idx].quantity += 1;
        setCart(newCart);
      }
    } catch (err) {}
  };

  return (
    <Grid item xs={9} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          sx={{ backgroundColor: primary, color: secondary }}
          title={product.name}
        />
        <CardMedia component="img" height="194" image={product.image_path} />
        <CardContent>
          <Typography
            sx={{ color: primary, marginBottom: "0.5rem" }}
            variant="h5"
          >
            {"MRP : " + product.price + " ₹"}
          </Typography>
          <Typography sx={{ color: primary }} variant="body2">
            {"Seller Name : " + product.first_name + " " + product.last_name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            sx={{ color: primary }}
            onClick={handleAddCart}
            aria-label="add to favorites"
          >
            <AddShoppingCartIcon />
          </IconButton>
          <ExpandMore
            sx={{ color: primary }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          sx={{ color: primary }}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
