import express from "express";
import {
  verifyToken,
  checkBuyer,
  checkSeller,
} from "../middlewares/auth.middleware";
import * as orderController from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.get("", verifyToken, checkBuyer, orderController.getAll);
orderRouter.post(
  "/create",
  verifyToken,
  checkBuyer,
  orderController.createOrder
);
orderRouter.delete(
  "/delete/:orderId",
  verifyToken,
  checkBuyer,
  orderController.deleteOrder
);

orderRouter.put(
  "/changeStatus/:orderId",
  verifyToken,
  checkSeller,
  orderController.changeStatus
);

orderRouter.get("/my", verifyToken, checkSeller, orderController.getMyOrders);

export default orderRouter;
