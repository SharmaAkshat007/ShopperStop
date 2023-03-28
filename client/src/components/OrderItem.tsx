import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import getAccessToken from "../utils/getAccessToken";

interface CartItemProps {
  item: any;
  idx: number;
  setOrders: Dispatch<SetStateAction<Array<any>>>;
  orders: Array<any>;
}

export default function CartItem(props: CartItemProps) {
  const { item, idx, setOrders, orders } = props;

  const handleDeleteOrder = async () => {
    try {
      const access_token = await getAccessToken();

      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/order/delete/${item.order_product_id}`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      const newOrders = orders.filter((item, index) => !(index === idx));
      setOrders(newOrders);
    } catch (err) {}
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.address_line1 +
              " " +
              item.address_line2 +
              " " +
              item.city +
              " " +
              item.state +
              " " +
              item.pin_code +
              " " +
              item.mobile_no}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {"Price : " + item.price + " ₹"}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Status : {item.status === false ? "Shipped" : "Delivered"}
          </Typography>
        </CardContent>
        {item.status === false ? (
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={handleDeleteOrder}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>

      <CardMedia component="img" sx={{ width: 151 }} image={item.image_path} />
    </Card>
  );
}
