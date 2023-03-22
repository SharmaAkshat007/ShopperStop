import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";

interface ProductTileProps {
  product: {
    description: string;
    image: string;
    imageLabel: string;
    title: string;
  };
}

export default function ProductTile(props: ProductTileProps) {
  const { product } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {product.description}
            </Typography>
            <Button color="primary">Buy</Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={product.image}
            alt={product.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
