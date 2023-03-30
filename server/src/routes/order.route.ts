import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import * as orderController from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.get("", verifyToken, orderController.getAll);
orderRouter.post("/create", verifyToken, orderController.createOrder);
orderRouter.delete(
  "/delete/:orderId",
  verifyToken,
  orderController.deleteOrder
);

orderRouter.put(
  "/changeStatus/:orderId",
  verifyToken,
  orderController.changeStatus
);

orderRouter.get("/my", verifyToken, orderController.getMyOrders);

export default orderRouter;
