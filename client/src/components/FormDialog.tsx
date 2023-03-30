import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Dispatch, SetStateAction, useState } from "react";
import errors from "../utils/error";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import { Box, Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { primary } from "../utils/color";

interface FormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  setPanel: Dispatch<SetStateAction<number>>;
}

interface UpdateProductProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  setPanel: Dispatch<SetStateAction<number>>;
}

function UpdateProduct(props: UpdateProductProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");

  const { setOpen, productId, setPanel } = props;

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

      try {
        const access_token: string = await getAccessToken();

        const res = Promise.all([
          await axios.put(
            `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product/update/${productId}`,
            {
              name: name,
              description: description,
              price: priceNumber,
              quantity: quantityNumber,
            },
            {
              headers: {
                authorization: `Bearer ${access_token}`,
              },
            }
          ),
          await axios.put(
            `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/product/update/image/${productId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${access_token}`,
              },
            }
          ),
        ]);
        setOpen(false);
        setPanel(0);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginBottom: "2rem", color: primary }}
        >
          Update Product
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: primary,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: primary,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primary,
                  },
                },
              }}
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
              sx={{
                "& label.Mui-focused": {
                  color: primary,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: primary,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primary,
                  },
                },
              }}
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
              sx={{
                "& label.Mui-focused": {
                  color: primary,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: primary,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primary,
                  },
                },
              }}
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
              sx={{
                "& label.Mui-focused": {
                  color: primary,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: primary,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primary,
                  },
                },
              }}
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
          <Button
            sx={{
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
            variant="contained"
            component="label"
            disableElevation={true}
          >
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
          <Button
            variant="contained"
            sx={{
              mt: "1rem",
              backgroundColor: primary,
              "&:hover": { backgroundColor: primary },
            }}
            onClick={handleSubmit}
            disableElevation={true}
          >
            Update Product
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default function FormDialog(props: FormDialogProps) {
  const { open, setOpen, productId, setPanel } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <UpdateProduct
          setOpen={setOpen}
          productId={productId}
          setPanel={setPanel}
        />
      </Dialog>
    </div>
  );
}
