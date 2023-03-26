import * as React from "react";
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
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

interface AdminProductTileProps {
  key: string;
  product: Product;
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { product } = props;

  const deleteProduct = (event: any) => {
    console.log(event.target);
  };

  return (
    <Grid item xs={10} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={product.name} />
        <CardMedia component="img" height="194" image={product.image_path} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {"MRP : " + product.price + " ₹"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton sx={{ color: "blue" }} aria-label="add to favorites">
            <UpdateIcon />
          </IconButton>
          <IconButton sx={{ color: "red" }} aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
