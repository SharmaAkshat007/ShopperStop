import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductTile from "../../components/ProductTile";
import Footer from "../../components/Footer";
import { getUser } from "../../utils/localStorage";
import { Redirect } from "react-router";
import { Role } from "../../enum";
import { useState, useEffect } from "react";
import { ProductSeller } from "../../types/product";
import axios from "axios";
import { User } from "../../types/user";
import getAccessToken from "../../utils/getAccessToken";

const sections = [
  { title: "Mobiles", url: "#" },
  { title: "Computers", url: "#" },
  { title: "TV", url: "#" },
  { title: "Appliances", url: "#" },
  { title: "Men's Fashion", url: "#" },
  { title: "Womens's Fashion", url: "#" },
  { title: "Sports", url: "#" },
  { title: "Health", url: "#" },
  { title: "Books", url: "#" },
  { title: "Toys", url: "#" },
];

const banner = {
  title: "Buy with us!",
  description: "The most trusted C2C website out there",
  image:
    "https://images.unsplash.com/photo-1486848538113-ce1a4923fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80",
  imageText: "banner",
};

export default function Home() {
  const [products, setProducts] = useState<Array<ProductSeller>>([]);
  const user: User | null = getUser();

  const getAllProducts = async () => {
    try {
      const access_token: string = await getAccessToken();

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      const allProducts: Array<ProductSeller> = res.data.data.map(
        (data: ProductSeller) => {
          return {
            id: data.id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            price: data.price,
            user_id: data.user_id,
            image_name: data.image_name,
            image_path: data.image_path,
            email: data.email,
            mimetype: data.mimetype,
            size: data.size,
            first_name: data.first_name,
            last_name: data.last_name,
          } as ProductSeller;
        }
      );

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

  if (user === null || user.role === Role.SELLER) {
    return <Redirect to="/signin"></Redirect>;
  } else {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="ShoppersStop" sections={sections} />
          <main>
            <Banner post={banner} />
            <Grid container spacing={4}>
              {products.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </Grid>
          </main>
        </Container>
        <Footer title="" description="Made with ❤️ by Akshat Sharma" />
      </>
    );
  }
}
