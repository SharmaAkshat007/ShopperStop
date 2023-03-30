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
import { SideDrawerOrder } from "../../components/SideDrawerOrder";
import { Box } from "@mui/material";
const banner = {
  title: "Buy with us!",
  description: "The most trusted C2C website out there",
  image:
    "https://img.freepik.com/free-vector/mandala-design-background_79603-2154.jpg?w=1060&t=st=1680166752~exp=1680167352~hmac=f67902ec0d672c4ead001b9ebe09fcc4ec303763a6ec3e587f986babf7935d82",
  imageText: "banner",
};

export default function Home() {
  const [products, setProducts] = useState<Array<ProductSeller>>([]);
  const [cart, setCart] = useState<Array<Cart>>([]);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [orders, setOrders] = useState<Array<any>>([]);

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

      const cartData: Array<Cart> = res.data.data.map((item: any) => {
        return {
          id: item.product_id,
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

  const getAllOrders = async () => {
    try {
      const access_token: string = await getAccessToken();
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/order`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      setOrders(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    getAllProducts();
    getCartItems();
    getAllOrders();
  }, []);

  if (user === null) {
    return <Redirect to="/signin"></Redirect>;
  } else {
    return (
      <>
        <CssBaseline />
        <div style={{ maxWidth: "100%" }}>
          <Header
            title="ShoppersStop"
            sections={sections}
            cart={cart}
            setOpen={setOpen}
            setOpenOrder={setOpenOrder}
          />
          <main>
            <Banner post={banner} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                <Grid container>
                  {products.map((product) => (
                    <ProductTile
                      key={product.id}
                      product={product}
                      cart={cart}
                      setCart={setCart}
                    />
                  ))}
                </Grid>
              </div>
            </Box>
          </main>
          <SideDrawerCart
            open={open}
            setOpen={setOpen}
            cart={cart}
            setCart={setCart}
          />
          <SideDrawerOrder
            openOrder={openOrder}
            setOpenOrder={setOpenOrder}
            orders={orders}
            setOrders={setOrders}
          />
        </div>
        <Footer title="" description="Made with ❤️ by Akshat Sharma" />
      </>
    );
  }
}
