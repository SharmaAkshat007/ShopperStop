import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import * as addressController from "../controllers/address.controller";
const addressRouter = express.Router();

addressRouter.get("", verifyToken, addressController.getAll);
addressRouter.post("/create", verifyToken, addressController.createAddress);
addressRouter.put(
  "/update/:addressId",
  verifyToken,
  addressController.updateAddress
);
addressRouter.delete(
  "/delete/:addressId",
  verifyToken,
  addressController.deleteAddress
);

export default addressRouter;
