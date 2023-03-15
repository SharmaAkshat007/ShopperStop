import express from "express";
import * as authController from "../controllers/auth.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post(
  "/token",
  authMiddleware.verifyRefreshToken,
  authController.getAccessToken
);
authRouter.get("/logout", authMiddleware.verifyToken, authController.logout);

export default authRouter;
