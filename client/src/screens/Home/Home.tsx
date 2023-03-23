import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductTile from "../../components/ProductTile";
import Footer from "../../components/Footer";

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

const products = [
  {
    title: "Featured post",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

export default function Blog() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="ShoppersStop" sections={sections} />
        <main>
          <Banner post={banner} />
          <Grid container spacing={4}>
            {products.map((product) => (
              <ProductTile key={product.title} product={product} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer title="" description="Made with ❤️ by Akshat Sharma" />
    </>
  );
}
