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
import { Button, Grid } from "@mui/material";
import { Product } from "../types/product";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { primary, secondary } from "../utils/color";

interface AdminProductTileProps {
  key: string;
  product: Product;
  products: Array<Product>;
  setProducts: Dispatch<SetStateAction<Array<Product>>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  setProductId: Dispatch<SetStateAction<string>>;
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

export default function AdminProductTile(props: AdminProductTileProps) {
  const [expanded, setExpanded] = useState(false);

  const { setOpen, setProductId } = props;

  const handleClickOpen = (event: any) => {
    setOpen(true);
    const productId = event.target.id as string;
    setProductId(productId);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { product, products, setProducts } = props;

  const deleteProduct = async (event: any) => {
    try {
      const productId = event.target.id as string;

      const access_token: string = await getAccessToken();

      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product/delete/${productId}`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      const newProducts = products.filter(
        (product) => !(product.id === productId)
      );

      setProducts(newProducts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item xs={10} md={4}>
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
          <Typography variant="body2" sx={{ color: primary }}>
            {"Quantity : " + product.quantity}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            id={product.id}
            variant="contained"
            disableElevation={true}
            sx={{
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
            onClick={handleClickOpen}
          >
            Update
          </Button>
          <Button
            id={product.id}
            color="error"
            variant="contained"
            onClick={deleteProduct}
            disableElevation={true}
            sx={{
              marginLeft: "1rem",
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
          >
            Delete
          </Button>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              color: primary,
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          sx={{
            color: primary,
          }}
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
