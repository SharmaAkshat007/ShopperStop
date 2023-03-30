import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import * as cartController from "../controllers/cart.controller";
const cartRouter = express.Router();

cartRouter.get("/my", verifyToken, cartController.getAll);
cartRouter.post("/add", verifyToken, cartController.addCart);
cartRouter.put("/update", verifyToken, cartController.updateCart);
cartRouter.delete("/delete/:productId", verifyToken, cartController.deleteCart);

export default cartRouter;
