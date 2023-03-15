import express from "express";
import { verifyToken, checkBuyer } from "../middlewares/auth.middleware";
import * as cartController from "../controllers/cart.controller";
const cartRouter = express.Router();

cartRouter.get("/my", verifyToken, checkBuyer, cartController.getAll);
cartRouter.post("/add", verifyToken, checkBuyer, cartController.addCart);
cartRouter.put("/update", verifyToken, checkBuyer, cartController.updateCart);
cartRouter.delete(
  "/delete/:productId",
  verifyToken,
  checkBuyer,
  cartController.deleteCart
);

export default cartRouter;
