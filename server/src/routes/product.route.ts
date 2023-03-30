import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import * as productController from "../controllers/product.controller";
import upload from "../utils/multer";
const productRouter = express.Router();

productRouter.get("", verifyToken, productController.getProducts);
productRouter.get("/my", verifyToken, productController.getMyProducts);
productRouter.post(
  "/add",
  verifyToken,
  upload.single("image"),
  productController.addProduct
);
productRouter.put("/update/:id", verifyToken, productController.updateProduct);
productRouter.put(
  "/update/image/:id",
  verifyToken,
  upload.single("image"),
  productController.updateProductImage
);
productRouter.delete(
  "/delete/:id",
  verifyToken,
  productController.deleteProduct
);

export default productRouter;
