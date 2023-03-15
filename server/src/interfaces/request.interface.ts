import jwt from "jsonwebtoken";
import { Request } from "express";
export default interface UserRequest extends Request {
  user_data: jwt.JwtPayload;
  token: string;
}
