import express from "express";
import { verifyToken, checkBuyer } from "../middlewares/auth.middleware";
import * as addressController from "../controllers/address.controller";
const addressRouter = express.Router();

addressRouter.get("", verifyToken, checkBuyer, addressController.getAll);
addressRouter.post(
  "/create",
  verifyToken,
  checkBuyer,
  addressController.createAddress
);
addressRouter.put(
  "/update/:addressId",
  verifyToken,
  checkBuyer,
  addressController.updateAddress
);
addressRouter.delete(
  "/delete/:addressId",
  verifyToken,
  checkBuyer,
  addressController.deleteAddress
);

export default addressRouter;
