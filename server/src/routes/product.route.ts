import express from "express";
import {
  verifyToken,
  checkSeller,
  checkBuyer,
} from "../middlewares/auth.middleware";
import * as productController from "../controllers/product.controller";
import upload from "../utils/multer";
const productRouter = express.Router();

productRouter.get("", verifyToken, checkBuyer, productController.getProducts);
productRouter.get(
  "/my",
  verifyToken,
  checkSeller,
  productController.getMyProducts
);
productRouter.post(
  "/add",
  verifyToken,
  checkSeller,
  upload.single("image"),
  productController.addProduct
);
productRouter.put(
  "/update/:id",
  verifyToken,
  checkSeller,
  productController.updateProduct
);
productRouter.put(
  "/update/image/:id",
  verifyToken,
  checkSeller,
  upload.single("image"),
  productController.updateProductImage
);
productRouter.delete(
  "/delete/:id",
  verifyToken,
  checkSeller,
  productController.deleteProduct
);

export default productRouter;
