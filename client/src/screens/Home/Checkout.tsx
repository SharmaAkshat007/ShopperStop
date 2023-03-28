import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm";
import Review from "../../components/Review";
import Footer from "../../components/Footer";
import { useHistory, useLocation } from "react-router-dom";
import { Cart } from "../../types/cart";
import darkTheme from "../../utils/theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address } from "../../types/address";
import getAccessToken from "../../utils/getAccessToken";
import axios from "axios";
import errors from "../../utils/error";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
  step: number,
  addresses: Array<Address>,
  setAddress1: Dispatch<SetStateAction<string>>,
  setAddress2: Dispatch<SetStateAction<string>>,
  setMobile: Dispatch<SetStateAction<string>>,
  setCity: Dispatch<SetStateAction<string>>,
  setState: Dispatch<SetStateAction<string>>,
  setPin: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>,
  error: string,
  activeStep: number,
  setActiveStep: Dispatch<SetStateAction<number>>,
  setAddressId: Dispatch<SetStateAction<string>>,
  cart: Array<Cart>,
  addressId: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  pin: string,
  mobile: string
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          addresses={addresses}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setMobile={setMobile}
          setCity={setCity}
          setState={setState}
          setPin={setPin}
          setError={setError}
          error={error}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setAddressId={setAddressId}
        />
      );
    case 1:
      return <PaymentForm />;
    case 2:
      return (
        <Review
          cart={cart}
          addressId={addressId}
          address1={address1}
          address2={address2}
          city={city}
          state={state}
          pin={pin}
          mobile={mobile}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout(props: any) {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation<{ cart: Array<Cart> }>();
  const { cart } = location.state;
  const [addresses, setAddresses] = useState<Array<Address>>([]);

  // AdrressForm
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [addressId, setAddressId] = useState<string>("");

  const history = useHistory();

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        const access_token = await getAccessToken();

        if (
          address1.length !== 0 &&
          address2.length !== 0 &&
          mobile.length !== 0 &&
          city.length !== 0 &&
          state.length !== 0 &&
          pin.length !== 0 &&
          !isNaN(parseInt(mobile)) &&
          !isNaN(parseInt(pin)) &&
          error === errors.noError
        ) {
          const res = await axios.post(
            `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/address/create`,
            {
              address_line1: address1,
              address_line2: address2,
              city: city,
              state: state,
              pin_code: pin,
              mobile_no: mobile,
            },
            {
              headers: {
                authorization: `Bearer ${access_token}`,
              },
            }
          );
          setAddressId(res.data.data[0].id);
          setActiveStep(activeStep + 1);
        }
      } catch (err) {}
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 2) {
      try {
        const access_token = await getAccessToken();
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/order/create`,
          {
            address_id: addressId,
          },
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          }
        );
        setActiveStep(activeStep + 1);
      } catch (err) {}
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getAddresses = async () => {
    try {
      const access_token = await getAccessToken();
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/address`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      const allAddresses: Array<Address> = res.data.data.map(
        (address: Address) => address as Address
      );
      setAddresses(allAddresses);
    } catch {}
  };

  useEffect(() => {
    getAddresses();
  }, []);

  console.log(address1, address2, city, state, pin, mobile);
  console.log(addressId);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <br></br>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Home
              </Button>
            </>
          ) : (
            <>
              {getStepContent(
                activeStep,
                addresses,
                setAddress1,
                setAddress2,
                setMobile,
                setCity,
                setState,
                setPin,
                setError,
                error,
                activeStep,
                setActiveStep,
                setAddressId,
                cart,
                addressId,
                address1,
                address2,
                city,
                state,
                pin,
                mobile
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        <Footer title="" description="Made with ❤️ by Akshat Sharma" />
      </Container>
    </ThemeProvider>
  );
}
