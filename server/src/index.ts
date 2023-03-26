import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Logger from "./utils/logger";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";
import cartRouter from "./routes/cart.route";
import addressRouter from "./routes/address.route";
import orderRouter from "./routes/order.route";
import morganMiddleware from "./middlewares/morgan.middleware";
import Error from "./types/error";

dotenv.config();

const app = express();

app.use(cors());
app.use("/images", express.static(process.cwd() + "/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response): Response<any> => {
  return res.status(200).json({
    error: false,
    message: "Server running successfully!",
    data: {},
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/order", orderRouter);

app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> => {
    // Logger.error(err);
    return res.status(err.status || 500).json({
      error: true,
      message: err.message,
      data: [],
    });
  }
);
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  Logger.info(
    `Server running at PORT ${PORT}\n${process.env.DEV_BASE_URL}:${PORT}`
  );
});
