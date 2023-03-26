import axios from "axios";
import { User } from "../types/user";
import { getUser, setUser } from "./localStorage";

export default async function getAccessToken(): Promise<string> {
  const user: User = getUser() as User;

  const result = await axios.post(
    `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/auth/token`,
    {
      token: user.refreshToken,
    }
  );

  const {
    access_token,
    refresh_token,
  }: { access_token: string; refresh_token: string } = result.data.data[0];

  setUser({
    ...(user as User),
    refreshToken: refresh_token,
  });
  return access_token;
}
