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
import { useLocation } from "react-router-dom";
import { Cart } from "../../types/cart";
import darkTheme from "../../utils/theme";
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import getAccessToken from "../../utils/getAccessToken";
import axios from "axios";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number, addresses: Array<Address>) {
  switch (step) {
    case 0:
      return <AddressForm addresses={addresses} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout(props: any) {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation<{ cart: Array<Cart> }>();
  const { cart } = location.state;

  const [addresses, setAddresses] = useState<Array<Address>>([]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
            </>
          ) : (
            <>
              {getStepContent(activeStep, addresses)}
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
