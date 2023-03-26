import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { User } from "../types/user";
import getAccessToken from "../utils/getAccessToken";
import { getUser } from "../utils/localStorage";
import AdminProductTile from "./AdminProductTile";

export default function AllProduct() {
  const [products, setProducts] = useState<Array<Product>>([]);

  const user: User | null = getUser();
  const getAllProducts = async () => {
    try {
      const access_token: string = await getAccessToken();

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product/my`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      const allProducts: Array<Product> = res.data.data.map((data: Product) => {
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          user_id: data.user_id,
          image_name: data.image_name,
          image_path: data.image_path,
          mimetype: data.mimetype,
          size: data.size,
        } as Product;
      });
      setProducts(allProducts);
    } catch (err: any) {
      // console.log(err.response);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getAllProducts();
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {products.map((product: Product) => {
          return <AdminProductTile key={product.id} product={product} />;
        })}
      </Grid>
    </Container>
  );
}
