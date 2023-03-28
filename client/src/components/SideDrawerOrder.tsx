import { Button, Container, Drawer, Table, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import OrderItem from "./OrderItem";

interface SideDrawerOrderProps {
  openOrder: boolean;
  setOpenOrder: Dispatch<SetStateAction<boolean>>;
  orders: Array<any>;
  setOrders: Dispatch<SetStateAction<Array<any>>>;
}

export function SideDrawerOrder(props: SideDrawerOrderProps) {
  const { openOrder, setOpenOrder, orders, setOrders } = props;

  return (
    <Drawer
      anchor="right"
      open={openOrder}
      onClose={() => {
        setOpenOrder(false);
      }}
    >
      <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        {orders.map((item, idx) => {
          return (
            <OrderItem
              key={item.order_product_id}
              item={item}
              idx={idx}
              setOrders={setOrders}
              orders={orders}
            />
          );
        })}
      </Container>
    </Drawer>
  );
}
