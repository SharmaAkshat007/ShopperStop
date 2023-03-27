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
import { sections } from "../../utils/sections";
import { Cart } from "../../types/cart";
import { SideDrawerCart } from "../../components/SideDrawerCart";

const banner = {
  title: "Buy with us!",
  description: "The most trusted C2C website out there",
  image:
    "https://images.unsplash.com/photo-1486848538113-ce1a4923fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80",
  imageText: "banner",
};

export default function Home() {
  const [products, setProducts] = useState<Array<ProductSeller>>([]);
  const [cart, setCart] = useState<Array<Cart>>([]);
  const [open, setOpen] = useState(false);

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

  const getCartItems = async () => {
    try {
      const access_token: string = await getAccessToken();
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/cart/my`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      const cartData: Array<Cart> = res.data.data.map((item: Cart) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          image_path: item.image_path,
        };
      });
      setCart(cartData);
    } catch (err) {}
  };

  useEffect(() => {
    getAllProducts();
    getCartItems();
  }, []);

  if (user === null || user.role === Role.SELLER) {
    return <Redirect to="/signin"></Redirect>;
  } else {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            title="ShoppersStop"
            sections={sections}
            cart={cart}
            setOpen={setOpen}
          />
          <main>
            <Banner post={banner} />
            <Container>
              <Grid container spacing={4}>
                {products.map((product) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    cart={cart}
                    setCart={setCart}
                  />
                ))}
              </Grid>
            </Container>
          </main>
          <SideDrawerCart
            open={open}
            setOpen={setOpen}
            cart={cart}
            setCart={setCart}
          />
        </Container>
        <Footer title="" description="Made with ❤️ by Akshat Sharma" />
      </>
    );
  }
}
