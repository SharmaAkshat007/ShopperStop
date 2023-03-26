import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/system";
import { Button, Paper } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import errors from "../utils/error";
import axios from "axios";
import getAccessToken from "../utils/getAccessToken";
import SuccessBanner from "./SuccessBanner";

export default function AddProduct(props: {
  panel: number;
  setPanel: Dispatch<SetStateAction<number>>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const { setPanel } = props;

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleNameChange = (event: any) => {
    const value = event.target.value;
    setName(value);
    if (value.length === 0) {
      setError(errors.productNameEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handleDescriptionChange = (event: any) => {
    const value = event.target.value;
    setDescription(value);
    if (value.length === 0) {
      setError(errors.descriptionEmpty);
    } else {
      setError(errors.noError);
    }
  };

  const handlePriceChange = (event: any) => {
    const value = event.target.value;
    setPrice(value);
    if (value.length === 0) {
      setError(errors.priceEmpty);
    } else if (isNaN(parseFloat(value))) {
      setError(errors.priceNotNumber);
    } else {
      setError(errors.noError);
    }
  };

  const handleQuantityChange = (event: any) => {
    const value = event.target.value;
    setQuantity(value);
    if (value.length === 0) {
      setError(errors.quantityEmpty);
    } else if (isNaN(parseInt(value))) {
      setError(errors.quantityNotNumber);
    } else {
      setError(errors.noError);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      name.length !== 0 &&
      description.length !== 0 &&
      price.length !== 0 &&
      quantity.length !== 0 &&
      !isNaN(parseFloat(price)) &&
      !isNaN(parseInt(quantity)) &&
      file !== undefined
    ) {
      const priceNumber = parseFloat(price);
      const quantityNumber = parseInt(quantity);

      const formData = new FormData();

      formData.append("image", file);
      formData.append(
        "data",
        `{
        "name": "${name}",
        "description": "${description}",
        "quantity": ${quantity},
        "price": ${price}
      }`
      );

      try {
        const access_token: string = await getAccessToken();
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${access_token}`,
            },
          }
        );
        setPanel(2);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {success.length === 0 ? (
        <></>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {" "}
          <SuccessBanner message={success} />
        </Container>
      )}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: "2rem" }}>
            Add Product
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                error={error === errors.productNameEmpty}
                helperText={error === errors.productNameEmpty ? error : ""}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                autoComplete="description"
                variant="standard"
                error={error === errors.descriptionEmpty}
                helperText={error === errors.descriptionEmpty ? error : ""}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                fullWidth
                autoComplete="price"
                variant="standard"
                error={
                  error === errors.priceEmpty || error === errors.priceNotNumber
                }
                helperText={
                  error === errors.priceEmpty || error === errors.priceNotNumber
                    ? error
                    : ""
                }
                onChange={handlePriceChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="quantity"
                name="quantity"
                label="Quanitity"
                fullWidth
                autoComplete="quantity"
                variant="standard"
                error={
                  error === errors.quantityEmpty ||
                  error === errors.quantityNotNumber
                }
                helperText={
                  error === errors.quantityEmpty ||
                  error === errors.quantityNotNumber
                    ? error
                    : ""
                }
                onChange={handleQuantityChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "2rem" }}>
            <Button variant="contained" component="label">
              Upload Product Image
              <input
                hidden
                accept="image/png, image/jpg, image/jpeg, image/webp"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "1rem" }}
            >
              {file && `${file.name}`}
            </Typography>
          </Grid>

          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
